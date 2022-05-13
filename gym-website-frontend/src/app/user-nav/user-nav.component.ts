import { Component, OnInit } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {FriendService} from "../shared/services/friend.service";

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

   online = 0;

  constructor(private socket:Socket, private friendService:FriendService) { }

  ngOnInit() {
    this.socket.emit('getMembersOnline',{},(response) =>{
      this.online = response;
    });
    return this.friendService.newMembersOnline().subscribe((data)=>{
      this.online = data;
    })
  }


}
