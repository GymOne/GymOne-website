import { Component, OnInit } from '@angular/core';
import {FriendService} from "../shared/services/friend.service";
import {AuthState} from "../shared/stores/states/auth.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {FriendDto} from "../shared/dtos/friend.dto";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Select(AuthState.getEmail) currentEmail : Observable<string>;
  public email = "";
  public searchEmail;
  public $listFriends = null;
  public $listRequests = [];

  constructor(private friendService : FriendService, private socket:Socket) {
    this.currentEmail.subscribe((data)=>{
      this.email = data;
      this.getFriendRequests();
    })

  }

  loadFriends(){
    this.socket.emit('getFriends', this.email,(friends) =>{
      this.$listFriends = friends;
    });
  }

  ngOnInit() {
    this.loadFriends();

      this.friendService.listenOnlineFriends().subscribe( ()=> {
        this.loadFriends();
      })
  }

  getFriendRequests() {
    //Gets requests from the database with the users email tied to it.
    if (this.email != "") {
      this.$listRequests = []
      //this.$listFriends = []
      this.friendService.getRequests(this.email).subscribe((value) => {
        //console.log(value)
        //For loop
        for (let i = 0; i <value.length ; i++) {

          const friends = value[i];
          if (friends.isAccepted == true) {
            //this.$listFriends.push(friends);
          } else if(friends.isAccepted == false && friends.senderId != this.email) {
            this.$listRequests.push(friends);
          }
        }
      })
    }
  }

  acceptFriendRequest(friend : FriendDto){
    friend.isAccepted = true
    friend.receiverId = this.email
    console.table(friend)
   this.friendService.acceptFriend(friend).subscribe(data =>
    {
      this.getFriendRequests()
      this.loadFriends();
    })
  }
    getUsersEmail(email : string) : string{
       this.friendService.getUsersByEmail(email).subscribe(value => {
        return value
      })
      return null
    }

  unfriend(friend : any){
    friend.isAccepted = false
    friend.receiverId = this.email
    friend.senderId = friend.friendEmail
    this.friendService.deleteFriend(friend).subscribe(data =>
    {
      this.getFriendRequests();
      this.loadFriends();
    })
  }
  decline(friend: FriendDto){
    friend.isAccepted = false
    friend.receiverId = this.email
    this.friendService.deleteFriend(friend).subscribe(data =>
    {
      this.getFriendRequests();
      this.loadFriends();
    })
  }


  sendFriendRequest(searchEmail : string){
    if(searchEmail.length<1){
      return;
    }
    if(this.email != searchEmail){
        let friendDto: FriendDto  =
          { senderId: this.email, receiverId: searchEmail, isAccepted: false}
console.log(friendDto)
        this.friendService.makeRequest(friendDto);
     }
  }



}
