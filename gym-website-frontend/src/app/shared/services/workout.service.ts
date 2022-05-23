import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {workoutSession} from "../entities/workout-session.entity";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {exercise} from "../entities/exercise.entity";
import {workoutExercise} from "../entities/workout-exercise.entity";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService{
  constructor(private _http: HttpClient){

  }

  public getWorkoutSession(userId:string,date:Date):Observable<workoutSession>{
    return this._http.get<workoutSession>(environment.api +`/workout/session/${userId}/${date}`);
  }
  public deleteExercise(exerciseId:string){
    return this._http.delete(environment.api +`/exercise/deleteById/${exerciseId}`);
  }

  public createWorkoutSession(userId:string,date:Date):Observable<workoutSession>{
    return this._http.post<workoutSession>(environment.api +'/workout/session',{userId: userId,date:date});
  }

  public createExerciseInSession(sessionId: string, exerciseId:string){
    return this._http.post(environment.api +'/workout/exercise',{workoutSessionId:sessionId,exerciseId:exerciseId});
  }

  public getExercises(userId:string):Observable<exercise[]>{
    return this._http.get<exercise[]>(environment.api +`/exercise/findByUserId/${userId}`);
  }

  public createExercise(userId:string, name:string){
    return this._http.post(environment.api +'/exercise/create', {userId:userId,name:name});
  }

  public createExerciseSet(workoutExerciseId: string, weight: string, reps: string){
    return this._http.post(environment.api +'/workout/exercise/set',{workoutExerciseId:workoutExerciseId, weight:weight, reps:reps})
  }

  public deleteWorkoutExerciseSetById(_id:string){
    return this._http.delete(environment.api +`/workout/exercise/set/deleteById/${_id}`);
  }

  public deleteWorkoutExercises(exerciseId:string){
    return this._http.delete(environment.api +`/workout/exercise/deleteById/${exerciseId}`);
  }
}
