
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";
import {Login, Logout, Register} from "../actions/auth.action";
import {TokenDto} from "../../dtos/token.dto";
import {Router} from "@angular/router";
import {User} from "../../entities/user.entity";
import jwt_decode from "jwt-decode";
import {exercise} from "../../entities/exercise.entity";
import {workoutSession} from "../../entities/workout-session.entity";
import {WorkoutService} from "../../services/workout.service";
import {AuthState, AuthStateModel} from "./auth.state";

import {
  CreateWorkoutExercise,
  CreateWorkoutExerciseSet,
  DeleteWorkoutExercise, DeleteWorkoutExerciseSet,
  LoadWorkout, SetWorkoutDate
} from "../actions/tracking.action";
import {append, patch} from "@ngxs/store/operators";
import { Store } from '@ngxs/store';

export class TrackingStateModel {
  workoutSession: workoutSession;
  selectedDate: Date;
}


@State<TrackingStateModel>({
  name: 'tracking',
  defaults: {
    workoutSession: null,
    selectedDate: null
  }
})

@Injectable()
export class TrackingState {

  constructor(private _workoutService :WorkoutService,private store: Store) {}

  @Selector()
  static getDate(state: TrackingStateModel) {
    return state.selectedDate;
  }

  @Selector()
  static getWorkout(state: TrackingStateModel) {
    return state.workoutSession;
  }

  @Action(SetWorkoutDate)
  SetWorkoutDate(ctx: StateContext<TrackingStateModel>, action:SetWorkoutDate){
    ctx.patchState({
      selectedDate:action.date
    });
    this.store.dispatch(new LoadWorkout(action.date))
  }

  @Action(LoadWorkout)
  LoadWorkout(ctx: StateContext<TrackingStateModel>,action:LoadWorkout) {
    const userId = this.store.selectSnapshot(AuthState.getUserId);
    this._workoutService.getWorkoutSession(userId,action.date).subscribe(value => {
        ctx.patchState({
          workoutSession:value
        });
      },
      err => {
      })
  }

  @Action(CreateWorkoutExercise)
  CreateWorkoutExercise(ctx: StateContext<TrackingStateModel>,action:CreateWorkoutExercise){
    const userId = this.store.selectSnapshot(AuthState.getUserId);
    const state = ctx.getState();
    if(!state.workoutSession){
      this._workoutService.createWorkoutSession(userId,state.selectedDate).subscribe(createdSession => {
        ctx.patchState({
          workoutSession:createdSession
        });
        this._workoutService.createExerciseInSession(createdSession._id,action.exerciseId).subscribe(value => {this.store.dispatch(new LoadWorkout(state.selectedDate))});
      });
    }else{
      this._workoutService.createExerciseInSession(state.workoutSession._id,action.exerciseId).subscribe(value => {this.store.dispatch(new LoadWorkout(state.selectedDate))});
    }
  }

  @Action(DeleteWorkoutExercise)
  DeleteWorkoutExercise(ctx: StateContext<TrackingStateModel>, action:DeleteWorkoutExercise){
    this._workoutService.deleteWorkoutExercises(action.exerciseId).subscribe(_ => {
      const state = ctx.getState();
      this.store.dispatch(new LoadWorkout(state.selectedDate))
    })
  }

  @Action(CreateWorkoutExerciseSet)
  CreateWorkoutExerciseSet(ctx: StateContext<TrackingStateModel>,action:CreateWorkoutExerciseSet){
    this._workoutService.createExerciseSet(action.workoutExerciseId, action.weight, action.reps).subscribe(_ => {
      const state = ctx.getState();
      this.store.dispatch(new LoadWorkout(state.selectedDate))
    })
  }

  @Action(DeleteWorkoutExerciseSet)
  DeleteWorkoutExerciseSet(ctx: StateContext<TrackingStateModel>,action:DeleteWorkoutExerciseSet){
    this._workoutService.deleteWorkoutExerciseSetById(action.setId).subscribe(_ => {
      const state = ctx.getState();
      this.store.dispatch(new LoadWorkout(state.selectedDate))
    })
  }


}
