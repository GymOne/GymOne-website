
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";
import {Login, Logout, Register} from "../actions/auth.action";
import {TokenDto} from "../../dtos/token.dto";
import {Router} from "@angular/router";
import {User} from "../../entities/user.entity";
import jwt_decode from "jwt-decode";
import {Socket} from "ngx-socket-io";

export class AuthStateModel {
  user:User;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static getToken(state: AuthStateModel) {
    return state.user.token;
  }

  @Selector()
  static getUserId(state: AuthStateModel) {
    return state.user.id;
  }

  @Selector()
  static getEmail(state: AuthStateModel) {
    return state.user.email;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.user.token;
  }

  constructor(private authService: AuthService, private _router: Router, private socket:Socket) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(tap((result: TokenDto)=>{
      const decoded = jwt_decode(result.token)['user'] as User;
      this.socket.emit('connectUser',decoded.email);
      ctx.patchState({
        user: {
          id: decoded.id,
          token: result.token,
          email: decoded.email
        }
      });
    }))
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>,action: Register) {
    return this.authService.register(action.payload);
  }

  @Action(Logout)
  logout({ setState }:StateContext<AuthStateModel>){
    return this.authService.logout().pipe(
      tap(_ => {
        setState({user:null});
      })
    );
  }

}
