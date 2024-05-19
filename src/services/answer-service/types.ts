import { IAnswer } from "../../types/models/IAnswer";

export interface IAnswerService {
  getAnswersInQuestion(questionId: string): Promise<IAnswer[]>;
}

export interface ICheckAnswersParams {
  id: string;
  isSelected: boolean;
  questionId: string;
  exerciseId: string;
}

export interface ICheckAnswerResult extends Omit<ICheckAnswersParams, 'isSelected'> {
  isCorrectAnswer: boolean;
}

export interface ICheckAnswersResult {
  answers: ICheckAnswerResult[];
  mark: number;
}
