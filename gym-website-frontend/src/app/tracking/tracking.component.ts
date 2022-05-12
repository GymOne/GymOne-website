import {Component, Input, OnInit} from '@angular/core';
import {workoutSession} from "../shared/entities/workout-session.entity";
import {WorkoutService} from "../shared/services/workout.service";
import {exercise} from "../shared/entities/exercise.entity";
import {NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {workoutExercise} from "../shared/entities/workout-exercise.entity";
import {AuthState} from "../shared/stores/states/auth.state";
import {Select, Store} from "@ngxs/store";
import {Logout} from "../shared/stores/actions/auth.action";
import {
  CreateWorkoutExercise,
  CreateWorkoutExerciseSet, DeleteWorkoutExercise, DeleteWorkoutExerciseSet,
  LoadWorkout, SetWorkoutDate
} from "../shared/stores/actions/tracking.action";
import {TrackingState} from "../shared/stores/states/tracking.state";
import {Observable} from "rxjs";
import {ExerciseState} from "../shared/stores/states/exercise.state";
import {CreateExercise, DeleteExercise, LoadExercises} from "../shared/stores/actions/exercise.action";

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

  isAddMode: boolean = true;

  @Select(TrackingState.getWorkout)
  workoutSession$: Observable<workoutSession>;

  @Select(ExerciseState.getExercises)
  exercises$: Observable<exercise[]>;

  constructor(private store:Store,private workoutService:WorkoutService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = true;
  }


  ngOnInit(): void {
    this.inputDate = this.currentDateAsString();
    const currentDate = this.inputDate as Date;

    this.store.dispatch(new SetWorkoutDate(currentDate))
    this.store.dispatch(new LoadExercises)
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
    const dateChange = this.inputDate as Date;
    this.store.dispatch(new SetWorkoutDate(dateChange))
  }

  deleteExercise(exerciseId:string){
    this.store.dispatch(new DeleteExercise(exerciseId))
  }

  createWorkoutExercise(exerciseId: string) {
    this.store.dispatch(new CreateWorkoutExercise(exerciseId))
  }

  createExercise(name:string){
    this.store.dispatch(new CreateExercise(name))
  }

  createWorkoutExerciseSet(workoutExerciseId: string, weight: string, reps: string) {
    this.store.dispatch(new CreateWorkoutExerciseSet(workoutExerciseId,weight,reps));
  }

  deleteWorkoutExerciseSet(setId: string) {
    this.store.dispatch(new DeleteWorkoutExerciseSet(setId))
  }

  deleteWorkoutExercise(exerciseId: string) {
    this.store.dispatch(new DeleteWorkoutExercise(exerciseId));
  }


  open(content: any, isAddMode: boolean) {
    this.isAddMode = isAddMode;
    this.modalService.open(content);
  }

  open2(content: any) {
    this.modalService.open(content);
  }
}
