import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/RequestValidationError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Error structure:
  //   {
  //     errors:{
  //       message:String,
  //       field?:string
  //     }[]
  //   }

  if (err instanceof RequestValidationError) {
    const formatedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    res.status(400).send({ errors: formatedErrors });
  }
  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
