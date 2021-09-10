import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequestError";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Must have a valid email"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Credentials are not correct");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestError("Credentials are not correct");
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // We check that JWT_KEY exists on the index.ts start function
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(user);
  }
);

export { router as signinRouter };
