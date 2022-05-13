import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto } from '../dtos/login.dto'
import { TokenDto } from '../dtos/token.dto'
import { Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
import {RegisterDto} from "../dtos/register.dto";
import {FriendDto} from "../dtos/friend.dto";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient) {}

  login(loginDto:LoginDto):Observable<TokenDto>{
    return this._http
      .post<TokenDto>(environment.api +'/auth/login',loginDto);
  }

  register(registerDto: RegisterDto) {
    return this._http
      .post(environment.api + '/auth/register', registerDto);
  }
    logout(): Observable<null> {
      return of(null);
    }
}
