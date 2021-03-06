import express, { Response, Request } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { UserSchema } from "../models/user-repo/user-repo";

const router = express.Router();
router.post(
  "/api-gateway/sign-up/user",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("passowrd must be greaer than 4"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
      services
    } = req.body;
    console.log("service",services);
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email already in used");
    }
    
    const createdUser = UserSchema.build({
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
      services
    });
    await createdUser.save();

    const userJWT = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      "noman"
    );

    req.session!.jwt = userJWT;

    res.status(201).send({ createdUser });
  }
);
export { router as signUpRouter };
