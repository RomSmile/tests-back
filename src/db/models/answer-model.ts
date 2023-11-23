import { Model } from "sequelize";
import { IAnswer } from "../../types/models/IAnswer";

export default class Answer extends Model implements IAnswer {
  id: string;
  isCorrect: boolean;
  questionId: string;
  text: string;
  constructor(id, ) {
    super();
  }
};
