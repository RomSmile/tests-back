import { IQuestion } from "../../types/models/IQuestion";
import {DBReturnType} from "../../types";

export interface IQuestionService {
  getQuestionsInExercise(exerciseId: string): Promise<IQuestion[]>;
  createQuestion(title: string, exerciseId: string): Promise<{ id: string }>;
}
