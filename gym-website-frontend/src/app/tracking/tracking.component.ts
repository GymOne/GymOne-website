import { Component, OnInit } from '@angular/core';
import {workoutSession} from "./entities/workout-session.entity";
import {WorkoutService} from "./shared/workout.service";
import {exercise} from "./entities/exercise.entity";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  inputDate: any;

  workoutSession: workoutSession | undefined;
  exercises: exercise[] | undefined;


  constructor(private workoutService:WorkoutService) { }

  ngOnInit(): void {
    this.inputDate = this.currentDateAsString();
    if(this.workoutSession == undefined){
      this.loadExercises();
      this.loadWorkout();
    }
  }
  currentDateAsString():string{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
  displayName = true


  onValueChanged() {
    this.loadWorkout()
  }

  loadWorkout():void{
    var date = this.inputDate as Date;
    this.workoutService.getWorkoutSession('6268ec483d068e67487af32f',date).subscribe(value => {
      this.workoutSession = value;
      },
      err => {
      })
  }
  loadExercises():void{
    this.workoutService.getExercises('6268ec483d068e67487af32f').subscribe(value => {
      this.exercises = [];
        this.exercises = value;
      },
      err => {
      })
  }

  deleteExerciseById(exerciseId:string){
    this.workoutService.deleteWorkoutExercises(exerciseId).subscribe(value => {
      this.loadWorkout();
      this.loadExercises();
    });
  }

  addExerciseToSession(exerciseId: string) {
    if(!this.workoutSession){
      this.workoutService.createWorkoutSession('6268ec483d068e67487af32f',this.inputDate as Date).subscribe(createdSession => {
        this.workoutSession = createdSession;
        console.log(createdSession._id)
        this.workoutService.createExerciseInSession(this.workoutSession._id,exerciseId).subscribe();
      });
    }else{
      this.workoutService.createExerciseInSession(this.workoutSession._id,exerciseId).subscribe();
    }

    //add exercise
  }


}
