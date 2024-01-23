import { IQuestionDTO, IQuestionDTOCreate } from "./IQuestionDTO";
import { IExercise } from "../models/IExercise";

export interface IExerciseDTO extends IExercise {
  questions: IQuestionDTO[];
}

export interface IExerciseDTOCreate extends Omit<IExercise, 'id'> {
  questions: IQuestionDTOCreate[];
}