import { Injectable } from '@angular/core';
import {FriendDto} from "../dtos/friend.dto";
import {HttpClient} from "@angular/common/http";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  /*private list: Array<FriendDto>=[
    {"receiverId": "lolxd@gmail.com", "senderId": "martinhoumark@gmail.com", "isAccepted": false},
    {"receiverId": "somethingdifferent@gmail.com", "senderId": "martinhoumark@gmail.com", "isAccepted": true},
    {"receiverId": "hehehehehehe@gmail.com", "senderId": "galunga@gmail.com", "isAccepted": false}
  ];*/

  constructor(private _http: HttpClient){ }

  public getRequests(_email: string): Observable<FriendDto[]> {
    return this._http.get<FriendDto[]>(environment.api + 'getRequestsByEmail/${_email}')
  }
}


