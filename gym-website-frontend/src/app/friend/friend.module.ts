import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendRoutingModule } from './friend-routing.module';
import { FriendComponent } from './friend/friend.component';


@NgModule({
  declarations: [
    FriendComponent
  ],
  imports: [
    CommonModule,
    FriendRoutingModule
  ]
})
export class FriendModule { }
