import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "./errors/request-validation-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    console.log(req.body);
    //throw new DatabaseConnectionError();
    res.send({ message: "sign-up" });
  }
);
export { router as signUpRouter };
