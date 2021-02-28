import { ValidationError } from 'express-validator';
import { FormatedError } from './formatedError';

export class RequestValidationError extends FormatedError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  formatedErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
