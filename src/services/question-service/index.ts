import { IQuestionService } from "./types";
import { IQuestion } from "../../types/models/IQuestion";
import {DBReturnType} from "../../types";
import pool from "../../db/database";

export class QuestionService implements IQuestionService {
  async getQuestionsInExercise(exerciseId: string): Promise<IQuestion[]> {
    const questions: DBReturnType<IQuestion[]> =
      await pool.query(`SELECT * from public."Questions" where exerciseId='${exerciseId}'`);

    return questions.rows;
  }

  async createQuestion(title: string, exerciseId: string): Promise<{ id: string }> {
    const createdQuestion: DBReturnType<{ id: string }[]>
      = await pool.query(`
            insert into public."Questions" (title, exerciseId)
            values ('${title}', '${exerciseId}')
            RETURNING id
        `);

    return createdQuestion.rows[0];
  }
}