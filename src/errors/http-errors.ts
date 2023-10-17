import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const apiSchemasBadRequest = (error, res: Response) => {
  if (!error) {
    return;
  }

  if (!error.details[0].context.key) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "An error occurred.",
    });
  }
  return res.status(StatusCodes.BAD_REQUEST).json({
    message: error.details[0].message,
  });
};
