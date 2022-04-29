
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "../../auth/shared/login.dto";
import {Observable} from "rxjs";
import {TokenDto} from "../../auth/shared/token.dto";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {RegisterDto} from "../../auth/shared/register.dto";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _http:HttpClient) {}

  async loginWithEmail(loginDto:LoginDto):Promise<any>{
    const token = await this._http
      .post<TokenDto>(environment.api +'/auth/login',loginDto).toPromise();
    return token;
  }
  register(user: RegisterDto) {
    console.table(user)
    return this._http.post<any>(environment.api + '/auth/register', user).pipe(
      map(user => user)
    )
  }
}
