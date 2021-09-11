import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as Payload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
