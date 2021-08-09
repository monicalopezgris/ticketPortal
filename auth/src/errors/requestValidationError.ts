import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
