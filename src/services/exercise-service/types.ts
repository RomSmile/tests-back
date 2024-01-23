import { IExerciseDTO, IExerciseDTOCreate } from "../../types/dto/IExerciseDTO";
import { IAnswer } from "../../types/models/IAnswer";

export interface IExerciseService {
  getListOfExercises(): Promise<IExerciseDTO[]>;
  getExercise(id: string): Promise<IExerciseDTO>;
  createExercise(exercise: ICreateExerciseParams): Promise<IExerciseDTO>;
}

export type ICreateExerciseParams = IExerciseDTOCreate;