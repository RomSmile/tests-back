import { IQuestionDTO } from "./IQuestionDTO";
import { IExercise } from "../models/IExercise";

export interface IExerciseDTO extends IExercise {
  questions: IQuestionDTO[];
}
