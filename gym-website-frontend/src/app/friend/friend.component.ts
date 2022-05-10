import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/services/friend.service";
import {AuthState} from "../shared/stores/states/auth.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {FriendDto} from "../shared/dtos/friend.dto";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Select(AuthState.getEmail) currentEmail : Observable<string>;
  private email = "";
  public searchEmail;
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
    //Gets requests from the database with the users email tied to it.
    if (this.email != "") {
      this.$listRequests = []
      this.$listFriends = []
      this.friendService.getRequests(this.email).subscribe((value) => {
        //For loop
        for (let i = 0; i <value.length ; i++) {
          const friends = value[i];
          if (friends.isAccepted == true) {
            this.$listFriends.push(friends);
          } else if(friends.isAccepted == false && friends.senderId != this.email) {
            this.$listRequests.push(friends);
          }
        }
      })
    }
  }

  acceptFriendRequest(friend : FriendDto){
    friend.isAccepted = true
    friend.receiverEmail = this.email
    console.table(friend)
   this.friendService.acceptFriend(friend).subscribe(data =>
    {
      this.getFriendRequests()
    })


  }
  unfriend(friend : FriendDto){
    friend.isAccepted = false
    friend.receiverEmail = this.email
    console.table(friend)
    this.friendService.deleteFriend(friend).subscribe(data =>
    {
      this.getFriendRequests()
    })
  }


  sendFriendRequest(searchEmail : string){

    if(this.email != searchEmail && searchEmail != ""){
        let friendDto: FriendDto  =
          {senderId: this.email, receiverEmail: searchEmail, isAccepted: false}

        this.friendService.makeRequest(friendDto).subscribe((data =>{console.log(data)}))
     }
  }



}
