import { Injectable } from '@angular/core';
import {FriendDto} from "../dtos/friend.dto";
import {HttpClient} from "@angular/common/http";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {exercise} from "../entities/exercise.entity";
import {SimpleOuterSubscriber} from "rxjs/internal/innerSubscribe";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class FriendService {


  constructor(private _http: HttpClient, private socket:Socket) {
  }

  public getRequests(email: string): Observable<FriendDto[]> {
    return this._http.get<FriendDto[]>('http://localhost:3000/friend/getRequestsByEmail/' + email)
  }

  public getUsersByEmail(email: string) : Observable<string>{
    return this._http.get<string>('http://localhost:3000/user/getByEmail/'+ email)
  }
  public acceptFriend(friendRequest: FriendDto) {
    console.log('Just before sending  '+ friendRequest.isAccepted, friendRequest.senderId, friendRequest.receiverEmail)
    return this._http.post<FriendDto>('http://localhost:3000/friend/actionOnRequet/', friendRequest)
  }

  public deleteFriend(friendRequest: FriendDto) {
    console.log('Just before sending  '+ friendRequest.isAccepted, friendRequest.senderId, friendRequest.receiverEmail)
    return this._http.post<FriendDto>('http://localhost:3000/friend/removeRequest/', friendRequest)
  }

  public makeRequest(friendRequest: FriendDto){
    this.socket.emit('sendFriendRequest',friendRequest);
  }
  getNewFriendRequest():Observable<string>{
    return this.socket.fromEvent<string>('newFriendRequest');
  }

  newMembersOnline():Observable<number>{
    return this.socket.fromEvent<number>('onlineMembers');
  }
}
