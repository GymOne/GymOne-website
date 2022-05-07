import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/services/friend.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
/*
list = this.friendService.getRequests()
  public $list: any; */
  constructor(private friendService : FriendService) {

  }

  ngOnInit(): void {
   /* for (let i = 0; i <this.friendService.getRequests().length ; i++) {
      this.$list.append('<li><h2>' + this.list[i].senderId + '</h2></li>');
      this.$list.append('<li><p>' + this.list[i].receiverId +'</p></li>');
      this.$list.append('<li><p>' + this.list[i].isAccepted + '</p></li>');
    }*/
  }

  getFriendRequests(){
    this.friendService.getRequests('lolidk@gmail.com').subscribe(value => {
      console.log(value)
    })
  }

}
