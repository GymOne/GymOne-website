import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "./shared/stores/states/auth.state";
import {FriendService} from "./shared/services/friend.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'gym-website-frontend';


  constructor(private store: Store, private friendService : FriendService, private notificationsService:NotificationsService) {

  }

  isLoggedIn(): boolean {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  ngOnInit() {
    return this.friendService.getNewFriendRequest().subscribe((name)=>{
      console.log("notification")
      this.notificationsService.info(`${name} sent you a friend request!`,"",{
        position: ['top','right'],
        timeOut: 2000,
        animate: 'fade',
        showProgressBare: true
      })
    })
  }

}
