import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
  status = 404;
  constructor() {
    super();
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: 'Not found' }];
  }
}
