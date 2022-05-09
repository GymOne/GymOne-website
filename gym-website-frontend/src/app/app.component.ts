import { Component } from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "./shared/stores/states/auth.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gym-website-frontend';
  authenticated:boolean = false;


  constructor(private store: Store) {
    this.authenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
  }

}
