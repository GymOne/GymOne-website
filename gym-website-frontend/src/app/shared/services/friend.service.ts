import { Injectable } from '@angular/core';
import {FriendDto} from "../dtos/friend.dto";
import {HttpClient} from "@angular/common/http";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {exercise} from "../entities/exercise.entity";
import {SimpleOuterSubscriber} from "rxjs/internal/innerSubscribe";

@Injectable({
  providedIn: 'root'
})
export class FriendService {


  constructor(private _http: HttpClient) {
  }

  public getRequests(email: string): Observable<FriendDto[]> {
    return this._http.get<FriendDto[]>('http://localhost:3000/friend/getRequestsByEmail/' + email)
  }


  public makeRequest(friendRequest: FriendDto) {
    console.log(friendRequest)
    return this._http.post<FriendDto>('http://localhost:3000/friend/submitRequest/', friendRequest)
  }
  public acceptFriend(friendRequest: FriendDto) {
    console.log('Just before sending  '+ friendRequest.isAccepted, friendRequest.senderId, friendRequest.receiverEmail)
    return this._http.post<FriendDto>('http://localhost:3000/friend/actionOnRequet/', friendRequest)
  }

  public deleteFriend(friendRequest: FriendDto) {
    console.log('Just before sending  '+ friendRequest.isAccepted, friendRequest.senderId, friendRequest.receiverEmail)
    return this._http.post<FriendDto>('PLACEHOLDER', friendRequest)
  }
}
