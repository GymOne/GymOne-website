import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserAuthState} from "./shared/auth/user.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym-website-frontend';
  // @ts-ignore
  @Select(UserAuthState.getUser) currentUser: Observable<string>;
  // @ts-ignore
  currentU : string;

  constructor(private store: Store) {
    // @ts-ignore
    this.currentUser.subscribe(
      (data) => {
        this.currentU = data;
      });
  }

}
