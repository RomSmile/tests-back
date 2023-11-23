import { IExerciseDTO } from "../types/dto/IExerciseDTO";
import {
  DBReturnType,
  ICreateExercise,
  ICreateExerciseParams,
  IExerciseService
} from "../types/services/exercise-service";
import pool from '../db/database';
import {IExercise} from "../types/models/IExercise";
import {IQuestion} from "../types/models/IQuestion";
import {IQuestionDTO} from "../types/dto/IQuestionDTO";
import {IAnswer} from "../types/models/IAnswer";
import {StatusCodes} from "http-status-codes";

export class ExerciseService implements IExerciseService {
  async GetListOfExercises(): Promise<IExerciseDTO[]> {
    const exercises: DBReturnType<IExerciseDTO[]> = await pool.query('SELECT * from public."Exercises"');
    return exercises.rows;
  }

  async getExercise(id: string): Promise<IExerciseDTO> {
    const exercises: DBReturnType<IExercise[]> = await pool.query(`SELECT * from public."Exercises" where id='${id}'`);

    if (!exercises.rows.length) {
      return null;
    }

    const questions: DBReturnType<IQuestion[]> = await pool.query(`SELECT * from public."Questions" where exerciseId='${id}'`)
    const questionsWithAnswers: IQuestionDTO[] = await Promise.all(questions.rows.map(async (question) => {
      const answers: DBReturnType<IAnswer[]> = await pool.query(`SELECT * from public."Answers" where "questionId"='${question.id}'`)
      return {
        ...question,
        answers: answers.rows,
      }
    }));

    return {
      id: id,
      title: exercises.rows[0].title,
      questions: questionsWithAnswers
    };
  }

  async createExercise(exercise: ICreateExerciseParams): Promise<ICreateExercise> {
    if (!exercise.title.length) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: 'You need to enter the title',
        response: null
      }
    }

    if (!exercise.questions.length) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: 'You need to add questions for exercise',
        response: null
      }
    }

    for(let i = 0; i <= exercise.questions.length - 1; i++) {
      if (!exercise.questions[i].title.length) {
        return {
          status: StatusCodes.BAD_REQUEST,
          error: `You need to enter the title for question number ${i + 1}`,
          response: null
        }
      }

      if (!exercise.questions[i].answers.length) {
        return {
          status: StatusCodes.BAD_REQUEST,
          error: `You need to add answers for question number ${i + 1}`,
          response: null
        }
      }
      let haveCorrectAnswer = false;

      for (let j = 0; j < exercise.questions[i].answers.length; j++) {
        if (exercise.questions[i].answers[j].isCorrect) {
          haveCorrectAnswer = true;
        }

        if (!exercise.questions[i].answers[j].text.length) {
          return {
            status: StatusCodes.BAD_REQUEST,
            error: `You need to add text for answer number ${j + 1}, in question ${i + 1}`,
            response: null,
          }
        }

        if (!haveCorrectAnswer && j === exercise.questions[i].answers.length - 1) {
          return {
            status: StatusCodes.BAD_REQUEST,
            error: `in question number ${i + 1}, should be at least one correct answer`,
            response: null,
          }
        }
      }
    }

    const createdExercise: DBReturnType<{ id: string }[]> = await pool.query(`insert into public."Exercises" (title) values ('${exercise.title}') RETURNING id`)
    const idOfNewExercise = createdExercise.rows[0].id;

    const questions = await Promise.all(exercise.questions.map(async (question) => {
      const createdQuestion
        = await pool.query(`
                insert into public."Questions" (title, exerciseId)
                values ('${question.title}', '${idOfNewExercise}')
                RETURNING id
            `);

      const idOfNewQuestion = createdQuestion.rows[0].id;
      const answers = await Promise.all(question.answers.map(async (answer) => {
        const createdNewAnswer: DBReturnType<{ id: string }> =
          await pool.query(`
                insert into public."Answers" (text, "questionId", "isCorrect")
                values ('${answer.text}', '${idOfNewQuestion}',${answer.isCorrect})
                RETURNING id
            `)

        return { ...answer, id: createdNewAnswer.rows[0].id, questionId: idOfNewQuestion }
      }))

      return { ...question, id: idOfNewQuestion, answers: answers, exerciseId: idOfNewExercise };
    }))

    return {
      status: StatusCodes.OK,
      error: '',
      response: {
        title: exercise.title,
        id: idOfNewExercise,
        questions: [...questions]
      },
    }
  }
}