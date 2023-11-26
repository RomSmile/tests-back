import { IExerciseDTO } from "../../types/dto/IExerciseDTO";
import { IAnswer } from "../../types/models/IAnswer";

export interface IExerciseService {
  getListOfExercises(): Promise<IExerciseDTO[]>;
  getExercise(id: string): Promise<IExerciseDTO>;
  createExercise(exercise: ICreateExerciseParams): Promise<IExerciseDTO>;
}

export interface ICreateExerciseParams {
  title: 'string',
  questions: {
    title: string,
    answers: IAnswer[],
  }[]
}