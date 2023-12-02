import db from '../../db/database';
import { ICreateExerciseParams, IExerciseService } from "./types";
import { DBReturnType } from "../../types";
import { IExercise } from "../../types/models/IExercise";
import { IQuestionDTO } from "../../types/dto/IQuestionDTO";
import { IExerciseDTO } from "../../types/dto/IExerciseDTO";
import {QuestionService} from "../question-service";
import {AnswerService} from "../answer-service";

export class ExerciseService implements IExerciseService {
  async getListOfExercises(): Promise<IExerciseDTO[]> {
    const exercises: DBReturnType<IExerciseDTO[]> = await db.query('SELECT * from published."Exercises"');
    return exercises.rows;
  }

  async getExercise(id: string): Promise<IExerciseDTO> {
    const exercises: DBReturnType<IExercise[]> = await db.query(`SELECT * from published."Exercises" where id='${id}'`);
    const questionService = new QuestionService();
    const answerService = new AnswerService();

    if (!exercises.rows.length) {
      return null;
    }

    const questions = await questionService.getQuestionsInExercise(id);
    const questionsWithAnswers: IQuestionDTO[] = await Promise.all(questions.map(async (question) => {
      const answers = await answerService.getAnswersInQuestion(question.id);
      return {
        ...question,
        answers: answers,
      }
    }));

    return {
      id: id,
      title: exercises.rows[0].title,
      questions: questionsWithAnswers
    };
  }

  async createExercise(exercise: ICreateExerciseParams): Promise<IExerciseDTO> {
    const questionService = new QuestionService();
    const answerService = new AnswerService();

    const createdExercise: DBReturnType<{ id: string }[]> = await db.query(`insert into published."Exercises" (title) values ('${exercise.title}') RETURNING id`)
    const idOfNewExercise = createdExercise.rows[0].id;

    const questions = await Promise.all(exercise.questions.map(async (question) => {
      const createdQuestion
        = await questionService.createQuestion(question.title, idOfNewExercise);

      const idOfNewQuestion = createdQuestion.id;
      const answers = await Promise.all(question.answers.map(async (answer) => {
        const createdNewAnswer = await answerService.createAnswer(answer.text, idOfNewQuestion, answer.isCorrect, idOfNewExercise );

        return { ...answer, id: createdNewAnswer.id, questionId: idOfNewQuestion }
      }))

      return { ...question, id: idOfNewQuestion, answers: answers, exerciseId: idOfNewExercise };
    }))

    return {
      title: exercise.title,
      id: idOfNewExercise,
      questions: [...questions]
    }
  }
}