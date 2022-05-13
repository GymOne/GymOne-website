import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FriendService } from './friend.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import e from 'express';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clientToEmail = {};

  constructor(private readonly friendService: FriendService) {}
  @SubscribeMessage('connectUser')
  connect(@MessageBody() email: string, @ConnectedSocket() client: Socket) {
    this.clientToEmail[client.id] = email;
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
    this.server.emit('onlineFriends');
  }

  @SubscribeMessage('getMembersOnline')
  async getMembersOnline() {
    return Object.keys(this.clientToEmail).length;
  }
  @SubscribeMessage('getFriends')
  async getFriendsOnline(@MessageBody() email: string) {
    const friends = [];
    const requests = await this.friendService.getRequestsByEmail(email);
    for (const request of requests) {
      let friend;

      if (request.isAccepted) {
        if (request.senderId == email) {
          friend = { friendEmail: request.receiverId, online: false };
        } else {
          friend = { friendEmail: request.senderId, online: false };
        }

        if (this.getKeyByValue(this.clientToEmail, friend.friendEmail))
          friend.online = true;
        friends.push(friend);
      }
    }
    return friends;
  }

  @SubscribeMessage('logout')
  async logOut(@ConnectedSocket() client: Socket) {
    delete this.clientToEmail[client.id];
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
    this.server.emit('onlineFriends');
  }

  @SubscribeMessage('sendFriendRequest')
  async create(
    @MessageBody() friendRequest: FriendRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.friendService.submitFriendRequest(
      friendRequest.senderId,
      friendRequest.receiverId,
      false,
    );

    const receiverSocketId = this.getKeyByValue(
      this.clientToEmail,
      friendRequest.receiverId,
    );
    if (receiverSocketId) {
      this.server
        .to(receiverSocketId)
        .emit('newFriendRequest', friendRequest.senderId);
    }
    return friendRequest;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  handleDisconnect(client: any): any {
    delete this.clientToEmail[client.id];
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
    this.server.emit('onlineFriends');
  }
}
