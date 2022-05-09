import { Injectable } from '@angular/core';
import {FriendDto} from "../dtos/friend.dto";
import {HttpClient} from "@angular/common/http";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {exercise} from "../entities/exercise.entity";

@Injectable({
  providedIn: 'root'
})
export class FriendService {


  constructor(private _http: HttpClient){ }

  public getRequests(email: string): Observable<FriendDto[]> {
    return this._http.get<FriendDto[]>('http://localhost:3000/friend/getRequestsByEmail/'+ email)
  }
}


