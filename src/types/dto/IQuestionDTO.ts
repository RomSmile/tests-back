import { IAnswerDTO } from "./IAnswerDTO";

export interface IQuestionDTO {
  questionId: string;
  answers: IAnswerDTO[];
};
