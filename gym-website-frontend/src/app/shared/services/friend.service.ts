import { Injectable } from '@angular/core';
import {FriendDto} from "../dtos/friend.dto";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private list: Array<FriendDto>=[
    {"receiverId": "lolxd@gmail.com", "senderId": "martinhoumark@gmail.com", "isAccepted": false},
    {"receiverId": "somethingdifferent@gmail.com", "senderId": "martinhoumark@gmail.com", "isAccepted": true},
    {"receiverId": "hehehehehehe@gmail.com", "senderId": "galunga@gmail.com", "isAccepted": false}
  ];

  constructor(){ }

  public getRequests(): FriendDto[]{
    return this.list
  }
}
