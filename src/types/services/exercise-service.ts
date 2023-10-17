import { IExerciseDTO } from "../dto/IExerciseDTO";


export interface IExerciseService {
  GetListOfExercises(): Promise<IExerciseDTO[]>;
  getExercise(id: string): Promise<IExerciseDTO>;
};
