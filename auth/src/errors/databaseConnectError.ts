import { ValidationError } from "express-validator";

export class DatabaseConnectError extends Error {
  message = "Database error";
  constructor() {
    super();

    //Mae the class work correctly after extending from Error
    Object.setPrototypeOf(this, DatabaseConnectError.prototype);
  }
}
