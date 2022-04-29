
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Login, Logout} from "./user.action";
import {UserAuthService} from "./user.service";
import {LoginDto} from "../../auth/shared/login.dto";

export class UserStateModel {
  // @ts-ignore
  user: string;
}

@State<UserStateModel>({
  name: 'UserAuth',
  defaults: {
    user: ''
  }
})
@Injectable()
export class UserAuthState {

  constructor(private authService: UserAuthService) {}

  @Selector()
  static getUser(state: UserStateModel): any {
    return state.user;
  }

  @Action(Login)
  loginAdmin({getState, setState}: StateContext<UserStateModel>, {loginDto}: Login): any {
    return this.authService.loginWithEmail(loginDto).then((result: any) => {
      console.log(result);
        const state = getState();
        setState({
          ...state,
          user: result.token,
        });
      }
    );
  }

  @Action(Logout)
  logout({getState, setState}: StateContext<UserStateModel>): any {
    const state = getState();
    setState({
      ...state,
      user: '',
    });
  }

}
