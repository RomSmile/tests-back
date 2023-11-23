import { IAnswerDTO } from "./IAnswerDTO";
import {IQuestion} from "../models/IQuestion";

export interface IQuestionDTO extends IQuestion {
  answers: IAnswerDTO[];
}
