import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service'
import { map } from 'rxjs/operators'
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../shared/stores/states/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,private _router:Router) {}

  canActivate(){
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    if(isAuthenticated) return true;

    return this._router.parseUrl('/auth/log-reg');

  }

}
