import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthState} from "../stores/states/auth.state";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  public uploadProfilePicture(file: any): Observable<Boolean>{
    return this._http.post<Boolean>('http://localhost:3000/user/uploadProfileImage', file)
  }
}
