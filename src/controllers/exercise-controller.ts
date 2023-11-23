import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ExerciseService } from "../services/exercise-service";
import {IExerciseDTO} from "../types/dto/IExerciseDTO";

export class ExerciseController {
  static async getListOfExercises(req: Request, res: Response) {
    const service = new ExerciseService();
    res.status(StatusCodes.OK).send({ items: await service.GetListOfExercises() });
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
    const service = new ExerciseService();

    const exercise = await service.createExercise({ title, questions })

    if (exercise.error) {
      res.status(exercise.status).send({ message: exercise.error });
    }

    res.status(exercise.status).send({ exercise: { ...exercise.response } });
  }
}