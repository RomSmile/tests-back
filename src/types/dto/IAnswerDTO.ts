import { IAnswer } from "../models/IAnswer";

export interface IAnswerDTO extends Omit<IAnswer, 'isCorrect'> {}
