import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectError } from "../errors/databaseConnectError";
import { NotFoundError } from "../errors/notFoundError";
import { CustomError } from "../errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).send({ errors: err.serializeError() });
  }
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
  next(err);
};
