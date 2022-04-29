import {LoginDto} from "../../auth/shared/login.dto";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public loginDto:LoginDto) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
