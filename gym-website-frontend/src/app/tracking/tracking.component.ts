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
    console.log("exercises")
    console.log(this.exercises)
  }

  loadWorkout():void{
    var date = this.inputDate as Date;
    this.workoutService.getWorkoutSession('62691b6f5f4429619d131392',date).subscribe(value => {
        this.workoutSession = value;
        console.log(value)
      },
      err => {
        console.log(err );
      })
  }
  loadExercises():void{
    this.workoutService.getExercises('62691b6f5f4429619d131392').subscribe(value => {
        this.exercises = value;
        console.log(this.exercises)
      },
      err => {
        console.log(err );
      })
  }
}
