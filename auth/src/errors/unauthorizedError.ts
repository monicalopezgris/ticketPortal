import { CustomError } from "./customError";

export class UnauthorizedError extends CustomError {
  status = 401;
  constructor() {
    super();
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeError() {
    return [{ message: "Unauthorized" }];
  }
}
