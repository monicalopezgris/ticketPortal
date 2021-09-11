import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  status = 400;
  constructor(public errors: ValidationError[]) {
    super();
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeError() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param };
    });
  }
}
