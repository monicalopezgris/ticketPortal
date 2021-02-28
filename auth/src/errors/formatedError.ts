export abstract class FormatedError extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, FormatedError.prototype);
  }
  abstract formatedErrors(): { message: string; field?: string }[];
}
