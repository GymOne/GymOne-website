import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogRegComponent} from "../auth/log-reg/log-reg.component";
import {FriendComponent} from "./friend/friend.component";

const routes: Routes = [{path: '', component: FriendComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule { }
