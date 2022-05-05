import {Component, Input, OnInit} from '@angular/core';
import {workoutSession} from "../shared/entities/workout-session.entity";
import {WorkoutService} from "../shared/services/workout.service";
import {exercise} from "../shared/entities/exercise.entity";
import {NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {workoutExercise} from "../shared/entities/workout-exercise.entity";
import {AuthState} from "../shared/stores/states/auth.state";
import {Store} from "@ngxs/store";
import {Logout} from "../shared/stores/actions/auth.action";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class TrackingComponent implements OnInit {
  inputDate: any;

  name = ''

  weight = '0'
  reps = '0'

  workoutSession: workoutSession | undefined;
  exercises: exercise[] =[];

  isAddMode: boolean = true;

  constructor(private store:Store,private workoutService:WorkoutService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = true;
  }


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
    this.store.dispatch(Logout)

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
        this.exercises = value;
      },
      err => {
      })
  }

  deleteExerciseById(exerciseId:string){
    this.workoutService.deleteExercises(exerciseId).subscribe(value => {
      this.loadWorkout();
      this.loadExercises();
    });
  }

  addExerciseToSession(exerciseId: string) {
    if(!this.workoutSession){
      this.workoutService.createWorkoutSession('6268ec483d068e67487af32f',this.inputDate as Date).subscribe(createdSession => {
        this.workoutSession = createdSession;
        this.workoutService.createExerciseInSession(this.workoutSession._id,exerciseId).subscribe(value => {this.loadWorkout();});
      });
    }else{
      this.workoutService.createExerciseInSession(this.workoutSession._id,exerciseId).subscribe(value => {this.loadWorkout();});
    }

  }

  createExercise(name:string){
    this.workoutService.createExercise('6268ec483d068e67487af32f', name).subscribe(value => {
      this.exercises.push(value as exercise);
    })
  }

  createExerciseSet(workoutExerciseId: string, weight: string, reps: string) {
    this.workoutService.createExerciseSet(workoutExerciseId, weight, reps).subscribe(value => {
      this.loadWorkout();
    })
  }

  deleteExerciseSetById(_id: string) {
    this.workoutService.deleteWorkoutExerciseSetById(_id).subscribe(value => {
      this.loadWorkout();
    })
  }

  deleteExerciseFromSession(exerciseId: string) {
    this.workoutService.deleteWorkoutExercises(exerciseId).subscribe(value => {
      this.loadWorkout();
    })
  }


  open(content: any, isAddMode: boolean) {
    this.isAddMode = isAddMode;
    this.modalService.open(content);
  }

  open2(content: any) {
    this.modalService.open(content);
  }

}
