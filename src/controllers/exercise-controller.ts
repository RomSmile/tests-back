import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ExerciseService } from "../services/exercise-service";

export class ExerciseController {
  static async getListOfExercises(req: Request, res: Response) {
    const service = new ExerciseService();
    res.status(StatusCodes.OK).send({ items: await service.GetListOfExercises });
  }

  static async getExercise(req: Request, res: Response) {
    const service = new ExerciseService();
    const exerciseToFind = await service.getExercise(req.params.id);
    
    if (!exerciseToFind) {
      return res.status(StatusCodes.NOT_FOUND).send('This exercise not found');
    }

    res.status(StatusCodes.OK).send({ exercise: exerciseToFind });
  }
}