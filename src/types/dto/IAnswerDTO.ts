import { IAnswer } from "../models/IAnswer";

export interface IAnswerDTO extends Omit<IAnswer, 'isCorrect'> {}

export interface IAnswerDTOCreate extends Omit<IAnswerDTO, 'id' | 'questionId'> {
  isCorrectAnswer: boolean;
}
