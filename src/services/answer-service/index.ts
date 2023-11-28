import {IAnswerService, ICheckAnswersParams, ICheckAnswersResult} from "./types";
import { IAnswer } from "../../types/models/IAnswer";
import {DBReturnType} from "../../types";
import db from "../../db/database";

export class AnswerService implements IAnswerService{
  async getAnswersInQuestion(questionID: string): Promise<IAnswer[]> {
    const answers: DBReturnType<IAnswer[]> = await db.query(`SELECT * from "Answers" where "questionId"='${questionID}'`);
    return answers.rows;
  }

  async getAnswersInExercise(exerciseId: string): Promise<IAnswer[]> {
    const answers: DBReturnType<IAnswer[]> = await db.query(`SELECT * from "Answers" where "exerciseId"='${exerciseId}'`);

    return answers.rows;
  }

  async createAnswer(text: string, questionId: string, isCorrect: boolean, exerciseId: string): Promise<{ id: string }> {
    const createdNewAnswer: DBReturnType<{ id: string }> =
      await db.query(`
          insert into "Answers" (text, "questionId", "isCorrect", "exerciseId")
          values ('${text}', '${questionId}', ${isCorrect}, '${exerciseId}')
          RETURNING id
      `)

    return createdNewAnswer.rows[0];
  }

  async checkAnswers(answers: ICheckAnswersParams[], exerciseId: string): Promise<ICheckAnswersResult> {
    const answersInExercise: IAnswer[] = await this.getAnswersInExercise(exerciseId);
    let mark = answers.length;

    const resultAnswers = answers.map((answer) => {
      const thisAnswerInExercise = answersInExercise.find((exerciseToFind) => exerciseToFind.id = answer.id);

      if (!(thisAnswerInExercise.isCorrect && answer.isSelected)) {
        mark--;
      }

      return {
        id: answer.id,
        isCorrectAnswer: thisAnswerInExercise.isCorrect && answer.isSelected,
        questionId: answer.questionId,
        exerciseId: answer.exerciseId,
      }
    })

    return {
      answers: resultAnswers,
      mark,
    }
  }
}