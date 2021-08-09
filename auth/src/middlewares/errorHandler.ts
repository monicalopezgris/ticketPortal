import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectError } from "../errors/databaseConnectError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formatedError = err.errors.map(error => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
    return res.status(400).send({ errors: formatedError });
  }

  if (err instanceof DatabaseConnectError) {
    return res.status(500).send({
      errors: [{ message: err.message }],
    });
  }
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
  next(err);
};
