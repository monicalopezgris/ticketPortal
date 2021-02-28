import { Request, Response, NextFunction } from 'express';
import { FormatedError } from '../errors/formatedError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof FormatedError) {
    res.status(err.statusCode).send({ errors: err.formatedErrors() });
  }
  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
