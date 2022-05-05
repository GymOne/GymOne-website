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

  // @ts-ignore
  @Select(AuthState.getUser) currentUser: Observable<string>;
  // @ts-ignore
  currentU : string;

  constructor(private store: Store) {
    // @ts-ignore
    this.currentUser.subscribe(
      (data) => {
          this.currentU = data;
      });
  }

  ngOnInit(): void {
  }

  Logout() {
    this.store.dispatch(new Logout());
  }
}
