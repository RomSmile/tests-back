import { IQuestionDTO } from "./IQuestionDTO";

export interface IExerciseDTO {
  exerciseId: string;
  questions: IQuestionDTO[];
};
