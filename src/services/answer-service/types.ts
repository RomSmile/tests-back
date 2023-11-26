import { IAnswer } from "../../types/models/IAnswer";
import Joi, {boolean, string} from "joi";

export interface IAnswerService {
  getAnswersInQuestion(questionId: string): Promise<IAnswer[]>;
}

export interface ICheckAnswersParams {
  id: string;
  isSelected: boolean;
  questionId: string;
  exerciseId: string;
}

interface ICheckAnswerResult extends Omit<ICheckAnswersParams, 'isSelected'> {
  isCorrectAnswer: boolean;
}

export interface ICheckAnswersResult {
  answers: ICheckAnswerResult[];
  mark: number;
}
