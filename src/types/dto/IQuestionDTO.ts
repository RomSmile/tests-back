import { IAnswerDTO, IAnswerDTOCreate } from "./IAnswerDTO";
import {IQuestion} from "../models/IQuestion";

export interface IQuestionDTO extends IQuestion {
  answers: IAnswerDTO[];
}

export interface IQuestionDTOCreate extends Omit<IQuestion, 'id' | 'exerciseId'> {
  answers: IAnswerDTOCreate[],
}
