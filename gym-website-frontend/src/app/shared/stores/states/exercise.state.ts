import {exercise} from "../../entities/exercise.entity";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {append, patch} from "@ngxs/store/operators";
import {TrackingState, TrackingStateModel} from "./tracking.state";
import {LoadExercises,CreateExercise,DeleteExercise} from "../actions/exercise.action";
import {WorkoutService} from "../../services/workout.service";
import {LoadWorkout} from "../actions/tracking.action";
import {AuthState} from "./auth.state";

export class ExerciseStateModel {
  exercises: exercise[];
}


@State<ExerciseStateModel>({
  name: 'exercise',
  defaults: {
    exercises: [],
  }
})
@Injectable()
export class ExerciseState{

  @Selector()
  static getExercises(state: ExerciseStateModel) {
    return state.exercises;
  }

  constructor(private _workoutService :WorkoutService,private store: Store) {
  }

  @Action(LoadExercises)
  LoadExercises(ctx: StateContext<ExerciseStateModel>) {
    const userId = this.store.selectSnapshot(AuthState.getUserId);
    this._workoutService.getExercises(userId).subscribe(value => {
        ctx.patchState({
          exercises:value
        });
      },
      err => {
      })
  }

  @Action(CreateExercise)
  CreateExercise(ctx: StateContext<ExerciseStateModel>,action:CreateExercise){
    const userId = this.store.selectSnapshot(AuthState.getUserId);
    this._workoutService.createExercise(userId, action.name).subscribe(value => {
      ctx.setState(
        patch({
          exercises: append([value as exercise])
        }))
    })
  }

  @Action(DeleteExercise)
  DeleteExercise(ctx: StateContext<ExerciseStateModel>,action:DeleteExercise){
    this._workoutService.deleteExercise(action.exerciseId).subscribe(_ => {
      const date = this.store.selectSnapshot(TrackingState.getDate);
      this.store.dispatch(new LoadWorkout(date))
      this.store.dispatch(new LoadExercises())
    });
  }

}
