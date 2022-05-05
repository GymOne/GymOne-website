import {LoginDto} from "../../dtos/login.dto";
import {RegisterDto} from "../../dtos/register.dto";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload:LoginDto) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload:RegisterDto) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
