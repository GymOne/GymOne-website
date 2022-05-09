export class SetWorkoutDate {
  static readonly type = '[Tracking] SetWorkoutDay';
  constructor(public date: Date) {}
}

export class LoadWorkout {
  static readonly type = '[Tracking] LoadWorkout';
  constructor(public date: Date) {}
}

export class CreateWorkoutExercise {
  static readonly type = '[Tracking] CreateWorkoutExercise';
  constructor(public exerciseId:string) {}
}

export class DeleteWorkoutExercise {
  static readonly type = '[Tracking] DeleteWorkoutExercise';
  constructor(public exerciseId:string) {}
}

export class CreateWorkoutExerciseSet {
  static readonly type = '[Tracking] CreateWorkoutExerciseSet';
  constructor(public workoutExerciseId:string,public weight:string,public reps:string) {}
}

export class DeleteWorkoutExerciseSet {
  static readonly type = '[Tracking] DeleteWorkoutExerciseSet';
  constructor(public setId:string) {}
}





