import { IExerciseDTO } from "../dto/IExerciseDTO";
import {IExercise} from "../models/IExercise";
import {IAnswer} from "../models/IAnswer";
import {IAnswerDTO} from "../dto/IAnswerDTO";

export interface DBReturnType<T> { rows: T }

export interface IExerciseService {
  GetListOfExercises(): Promise<IExerciseDTO[]>;
  getExercise(id: string): Promise<IExerciseDTO>;
  createExercise(exercise: ICreateExerciseParams): Promise<ICreateExercise>;
}

export interface ICreateExercise {
  status: number,
  error: string,
  response: IExerciseDTO
}

export interface ICreateExerciseParams {
  title: 'string',
  questions: {
    title: string,
    answers: IAnswerDTO[],
  }[]
}
