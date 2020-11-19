import express, { Response, Request } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "./middlewares/validate-request";
import { BadRequestError } from "./errors/bad-request-error";
import { UserSchema, UserAttrs } from "./models/user-repo/user-repo";
//import { BadRequestError } from "./errors/bad-request-error";
import { User } from "./models/user";
//import { UserSchema } from "./models/u ser-repo/user-repo";
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
    //console.log(req.body);
    //throw new DatabaseConnectionError();
    // res.send({ message: "sign-up" });

    const {
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
    } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      //console.log("email in Use");
      //return res.send({ message: "email in Use" });
      throw new BadRequestError("email already in used");
    }
    //const user = new User();
    //const ret = user.signUp();
    //const createdUser = UserSchema.build(user);
    const createdUser = UserSchema.build({
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
    });
    await createdUser.save();

    //generate jwt
    const userJWT = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      "sdsdsdsdsdsd"
    );
    // store it on session object
    req.session = { jwt: userJWT };
    res.status(201).send({ createdUser });
  }
);
export { router as signUpRouter };
