import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../shared/stores/states/auth.state";
import {Observable} from "rxjs";
import {Logout} from "../shared/stores/actions/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated:boolean = false;

  constructor(private store: Store) {
    this.authenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    console.log(this.authenticated)
  }

  ngOnInit(): void {
  }

  Logout() {
    this.store.dispatch(new Logout());
  }
}
