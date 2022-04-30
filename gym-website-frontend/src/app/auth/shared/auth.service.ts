import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto } from './login.dto'
import { TokenDto } from './token.dto'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
import { map, take, tap } from 'rxjs/operators'
import {RegisterDto} from "./register.dto";

const jwtToken = "jwtToken";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<string|null>(this.getToken());
  constructor(private _http:HttpClient) {}

  login(loginDto:LoginDto):Observable<TokenDto>{
    return this._http
      .post<TokenDto>(environment.api +'/auth/login',loginDto)
      .pipe(
        tap(token =>{
          if(token && token.jwt){
            localStorage.setItem(jwtToken,token.jwt);
            this.isLoggedIn$.next(token.jwt);
          }else{
            this.logout();
          }
        })
      );
  }
  register(user: RegisterDto) {
    console.table(user)
    return this._http.post<any>(environment.api + '/auth/register', user).pipe(
      map(user => user)
    )
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(jwtToken);
    this.isLoggedIn$.next(null);
    return of(true).pipe(take(1));
  }


  // getUserEmail():string{
  //   var jsonObject = this.getPayload();
  //   for(var key in jsonObject){
  //     if(key == "UserEmail"){
  //       return jsonObject[key];
  //     }
  //   }
  //   return null;
  // }
  //
  // hasRoleAdmin():boolean{
  //   var jsonObject = this.getPayload();
  //   for(var key in jsonObject){
  //     if(key == "Role"){
  //       if(jsonObject[key]=="Admin"){
  //         return true;
  //       }
  //     }
  //   }
  //
  //   return false;
  // }
  //
  // getUserID():number{
  //   var jsonObject = this.getPayload();
  //   for(var key in jsonObject){
  //     if(key == "UserId"){
  //       return Number(jsonObject[key]);
  //     }
  //   }
  //
  //   return null;
  // }
  //
  // private getPayload ():JSON {
  //   var base64Url = this.getToken().split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //
  //   return JSON.parse(jsonPayload);
  // };

  getToken():string | null {
    return localStorage.getItem(jwtToken);
  }



}
