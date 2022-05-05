
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "../dtos/login.dto";
import {Observable} from "rxjs";
import {TokenDto} from "../dtos/token.dto";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {RegisterDto} from "../dtos/register.dto";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _http:HttpClient) {}

  async login(loginDto:LoginDto):Promise<any>{
    this._http
      .post<TokenDto>(environment.api + '/auth/login', loginDto).subscribe(value => {return value});
  }
  register(user: RegisterDto) {
    console.table(user)
    return this._http.post<any>(environment.api + '/auth/register', user).pipe(
      map(user => user)
    )
  }


}
