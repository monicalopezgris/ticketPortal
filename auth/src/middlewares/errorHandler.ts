import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectError } from "../errors/databaseConnectError";
import { NotFoundError } from "../errors/notFoundError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.status).send({ errors: err.serializeError() });
  }

  if (err instanceof DatabaseConnectError) {
    return res.status(err.status).send({ errors: err.serializeError() });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.status).send({ errors: err.serializeError() });
  }
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
  next(err);
};
