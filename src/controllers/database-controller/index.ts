import { CreateTableService } from "../../services/createTable-service";
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";

export class DatabaseController {
  static async initApplication(_req: Request, res: Response) {
    const databaseService = new CreateTableService()

    try {
      await databaseService.createDataBase()

      res.status(StatusCodes.OK).send({ message: 'db created' });
    } catch (e) {
      res.status(StatusCodes.FORBIDDEN).send({ message: e.message === 'schema \"public\" already exists' ? 'application already initialized' : e.message });
    }
  }
}