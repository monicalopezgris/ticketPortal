import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ResultWithContext } from "express-validator/src/chain";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";
import Bcrypt from "bcryptjs";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be vaild"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Password must be vaild"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    try {
      let { email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new BadRequestError("User already exists");
      }
      password = Bcrypt.hashSync(password, 10);
      const user = User.build({ email, password });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      throw new BadRequestError(error);
    }
  }
);

export { router as signupRouter };
