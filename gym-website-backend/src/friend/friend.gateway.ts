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
import { Logger } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { User } from "../users/entities/user.entity";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clientToEmail = {};

  constructor(
    private readonly friendService: FriendService,
    private userService: UserService,
  ) {}
  @SubscribeMessage('connectUser')
  connect(
    @MessageBody() email: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.clientToEmail[client.id] = email;
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
  }

  @SubscribeMessage('getMembersOnline')
  async getMembersOnline() {
    return Object.keys(this.clientToEmail).length;
  }
  @SubscribeMessage('logout')
  async logOut(@ConnectedSocket() client: Socket){
    delete this.clientToEmail[client.id];
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
  }

  @SubscribeMessage('sendFriendRequest')
  async create(
    @MessageBody() friendRequest: FriendRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.friendService.submitFriendRequest(
      friendRequest.senderId,
      friendRequest.receiverEmail,
      false,
    );

    const receiverSocketId = this.getKeyByValue(
      this.clientToEmail,
      friendRequest.receiverEmail,
    );
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('newFriendRequest', friendRequest.senderId);
    }
    return friendRequest;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  handleDisconnect(client: any): any {
    delete this.clientToEmail[client.id];
    this.server.emit('onlineMembers', Object.keys(this.clientToEmail).length);
  }
}
