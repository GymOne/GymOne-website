import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthState} from "../stores/states/auth.state";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  public uploadProfilePicture(file: any): Observable<Boolean>{
    return this._http.post<Boolean>(environment.api+'/user/uploadProfileImage', file)
  }

  getImage(email: string): Observable<any> {
    const ob = {email: email}
    return this._http.post<any>(environment.api+'/user/getMyImage', ob)
  }
}
