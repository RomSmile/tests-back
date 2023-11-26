import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ExerciseService } from "../../services/exercise-service";
import { answerCheckExerciseSchema, exerciseCreateSchema } from "./schemas";
import { IAnswerDTO } from "../../types/dto/IAnswerDTO";
import { AnswerService } from "../../services/answer-service";

export class ExerciseController {
  static async getListOfExercises(req: Request, res: Response) {
    const service = new ExerciseService();
    res.status(StatusCodes.OK).send({ items: await service.getListOfExercises() });
  }

  static async getExercise(req: Request, res: Response) {
    const { id } = req.params;
    const service = new ExerciseService();
    const exerciseToFind = await service.getExercise(id);

    if (!exerciseToFind) {
      return res.status(StatusCodes.NOT_FOUND).send('This exercise not found');
    }

    res.status(StatusCodes.OK).send({ ...exerciseToFind });
  }

  static async createExercise(req: Request, res: Response) {
    const { title, questions } = req.body;
    const exercise = { title, questions };

    const isValidParams = exerciseCreateSchema.validate(exercise);

    if (isValidParams.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: isValidParams.error.details[0].message });
    }

    const service = new ExerciseService();

    const newExercise = await service.createExercise(exercise)

    res.status(StatusCodes.OK).send({ exercise: { ...newExercise } });
  }

  static async checkExercise(req: Request, res: Response) {
    const { answers, exerciseId } = req.body;
    const answerService = new AnswerService();

    const isValidAnswers = answerCheckExerciseSchema.validate(answers)

    if (isValidAnswers.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: isValidAnswers.error.details[0].message });
    }

    if (!answers.every((item: IAnswerDTO) => item.exerciseId === exerciseId)) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'All answers should be related from one exercise' });
    }

    const result = answerService.checkAnswers(answers, exerciseId);

    res.status(StatusCodes.OK).send({ result });
  }
}