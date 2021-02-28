import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 2, max: 8 })
      .withMessage('Password must be valid')
  ],
  (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new RequestValidationError(validationErrors.array());
    }
    res.status(200).send({ message: 'User created' });
  }
);

export { router as signupRouter };
