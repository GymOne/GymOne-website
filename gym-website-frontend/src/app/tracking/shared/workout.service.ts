import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {exercise} from "../entities/exercise.entity";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService{
  constructor(private _http: HttpClient){

  }

  public getWorkoutSession(userId:string,date:Date):Observable<workoutSession>{
    return this._http.get<workoutSession>(`http://localhost:3000/workout/session/${userId}/${date}`);
  }
  public getExercises(userId:string):Observable<exercise[]>{
    return this._http.get<exercise[]>(`http://localhost:3000/exercise/findByUserId/${userId}`);
  }
}
