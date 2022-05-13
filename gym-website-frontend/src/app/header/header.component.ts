import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "../shared/stores/states/auth.state";
import {BehaviorSubject} from "rxjs";
import {Logout} from "../shared/stores/actions/auth.action";
import {Router} from "@angular/router";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store,private router:Router, private socket:Socket) {
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  Logout() {
    this.store.dispatch(new Logout()).subscribe(success => {
      this.socket.emit('logout');
      this.router.navigate(['/auth/log-reg'])
    });
  }
}
