import { IQuestionService } from "./types";
import { IQuestion } from "../../types/models/IQuestion";
import { DBReturnType } from "../../types";
import db from "../../db/database";

export class QuestionService implements IQuestionService {
  async getQuestionsInExercise(exerciseId: string): Promise<IQuestion[]> {
    const questions: DBReturnType<IQuestion[]> =
      await db.query(`SELECT * from published."Questions" where exerciseId='${exerciseId}'`);

    return questions.rows;
  }

  async createQuestion(title: string, exerciseId: string): Promise<{ id: string }> {
    const createdQuestion: DBReturnType<{ id: string }[]>
      = await db.query(`
            insert into published."Questions" (title, exerciseId)
            values ('${title}', '${exerciseId}')
            RETURNING id
        `);

    return createdQuestion.rows[0];
  }
}