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
    return this._http.get<workoutSession>(`http://localhost:3000/workout/session/${userId}/${date}`);
  }
  public deleteExercise(exerciseId:string){
    return this._http.delete(`http://localhost:3000/exercise/deleteById/${exerciseId}`);
  }

  public createWorkoutSession(userId:string,date:Date):Observable<workoutSession>{
    return this._http.post<workoutSession>(`http://localhost:3000/workout/session`,{userId: userId,date:date});
  }

  public createExerciseInSession(sessionId: string, exerciseId:string){
    return this._http.post('http://localhost:3000/workout/exercise',{workoutSessionId:sessionId,exerciseId:exerciseId});
  }

  public getExercises(userId:string):Observable<exercise[]>{
    return this._http.get<exercise[]>(`http://localhost:3000/exercise/findByUserId/${userId}`);
  }

  public createExercise(userId:string, name:string){
    console.log('2......'+name)
    let vdjbfh = {userId, name}
    return this._http.post<any>(`http://localhost:3000/exercise/create`, vdjbfh )
    return this._http.post(`http://localhost:3000/exercise/create`, {userId:userId,name:name});
  }

  public createExerciseSet(workoutExerciseId: string, weight: string, reps: string){
    return this._http.post(`http://localhost:3000/workout/exercise/set`,{workoutExerciseId:workoutExerciseId, weight:weight, reps:reps})
  }

  public deleteWorkoutExerciseSetById(_id:string){
    return this._http.delete(`http://localhost:3000/workout/exercise/set/deleteById/${_id}`);
  }

  public deleteWorkoutExercises(exerciseId:string){
    return this._http.delete(`http://localhost:3000/workout/exercise/deleteById/${exerciseId}`);
  }
}
