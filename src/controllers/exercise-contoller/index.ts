import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import { ExerciseService } from "../../services/exercise-service";
import { answerCheckExerciseSchema, exerciseCreateSchema } from "./schemas";
import { IAnswerDTO } from "../../types/dto/IAnswerDTO";
import { AnswerService } from "../../services/answer-service";
import { IExerciseDTOCreate } from "../../types/dto/IExerciseDTO";

export class ExerciseController {
  static async getListOfExercises(req: Request, res: Response) {
    const { filter, page } = req.query;
    const service = new ExerciseService();

    const regularForOnlyNumbers = /[`a-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gi;

    if (+page === 0 || regularForOnlyNumbers.test((page as string))) {
      res.status(StatusCodes.BAD_REQUEST).send({message: "This page number is not valid"});
      return;
    }

    const pageNumber = page ? +page : 1;

    const exercises = filter
      ? await service.getListOfExercises()
        .then(
          (response) =>
            response.filter(
              (item) => item.title.toLowerCase().includes((filter as string).toLowerCase())
            )
        )
      : await service.getListOfExercises();

    const lastPage = Math.ceil(exercises.length / 10);

    if (pageNumber > (lastPage === 0 ? 1 : lastPage)) {
      res.status(StatusCodes.BAD_REQUEST).send({message: "This page number is not valid"});
      return;
    }

    res.status(StatusCodes.OK).send({
      items: [ ...exercises ].splice(pageNumber === 1 ? 0 : pageNumber * 10 - 10, 10),
      lastPage: lastPage,
    });
  }

  static async getExercise(req: Request, res: Response) {
    const { id } = req.params;
    const service = new ExerciseService();
    const exerciseToFind = await service.getExercise(id);

    if (!exerciseToFind) {
      res.status(StatusCodes.NOT_FOUND).send('This exercise not found');
      return;
    }

    res.status(StatusCodes.OK).send({ ...exerciseToFind });
  }

  static async createExercise(req: Request, res: Response) {
    const { title, questions } = req.body;
    const exercise: IExerciseDTOCreate = { title, questions };

    const isValidParams = exerciseCreateSchema.validate(exercise);

    if (isValidParams.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: isValidParams.error.details[0].message });
      return;
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

    const result = await answerService.checkAnswers(answers);

    res.status(StatusCodes.OK).send(result);
  }
}