import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  status = 400;
  constructor(public error: string) {
    super();
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeError() {
    return [{ message: this.error }];
  }
}
