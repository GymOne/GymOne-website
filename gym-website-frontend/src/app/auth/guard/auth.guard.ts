import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service'
import { map } from 'rxjs/operators'
import {Select} from "@ngxs/store";
import {UserAuthState} from "../../shared/auth/user.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // @ts-ignore
  @Select(UserAuthState.getUser) currentUser: Observable<string>;
  // @ts-ignore
  currentU : string;
  constructor(private _auth:AuthService, private _router:Router) {
    // @ts-ignore
    this.currentUser.subscribe(
      (data) => {
          this.currentU = data;
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    if(this.currentU != ''){
      return true;
    }

    return this._router.parseUrl('/auth/log-reg');
  }

}
