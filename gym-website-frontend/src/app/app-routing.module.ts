import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {AuthGuard} from "./auth/guard/auth.guard";
import {TrackingComponent} from "./tracking/tracking.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tracking', component: TrackingComponent, canActivate: [AuthGuard]  },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(f=>f.AuthModule)},
  { path: "friends", loadChildren: () => import('./friend/friend.module').then(f=>f.FriendModule)},

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
