import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class DatabaseConnectError extends CustomError {
  message = "Database error";
  status = 500;
  constructor() {
    super();
    //Make the class work correctly after extending from Error
    Object.setPrototypeOf(this, DatabaseConnectError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
