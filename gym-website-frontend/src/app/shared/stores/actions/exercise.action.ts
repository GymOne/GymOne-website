export class LoadExercises {
  static readonly type = '[Exercise] LoadExercises';
  constructor() {}
}
export class CreateExercise {
  static readonly type = '[Exercise] CreateExercise';
  constructor(public name: string) {}
}
export class DeleteExercise {
  static readonly type = '[Exercise] DeleteExercise';
  constructor(public exerciseId: string) {}
}





