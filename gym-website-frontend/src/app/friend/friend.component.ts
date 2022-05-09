import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/services/friend.service";
import {AuthState} from "../shared/stores/states/auth.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Select(AuthState.getEmail) currentEmail : Observable<string>;
  private email = "";
  public $listFriends = [];
  public $listRequests = [];

  constructor(private friendService : FriendService) {
    this.currentEmail.subscribe((data)=>{
      this.email = data;
      this.getFriendRequests();
    })

  }

  ngOnInit(): void {
   /* for (let i = 0; i <this.friendService.getRequests().length ; i++) {
      this.$list.append('<li><h2>' + this.list[i].senderId + '</h2></li>');
      this.$list.append('<li><p>' + this.list[i].receiverId +'</p></li>');
      this.$list.append('<li><p>' + this.list[i].isAccepted + '</p></li>');
    } */
  }

  getFriendRequests() {
    if (this.email != "") {
      this.friendService.getRequests(this.email).subscribe((value) => {
        console.table(value);
        for (let i = 0; i <value.length ; i++) {
          const friends = value[i];
          if (friends.isAccepted == false) {
            this.$listRequests.push(friends);
          } else {
            this.$listFriends.push(friends);
          }
        }
      })
    }
  }

}
