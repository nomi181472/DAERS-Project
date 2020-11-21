import express, { Request, Response } from "express";
import { exerciseModel } from "./models/exercise-repo/exercise-repo";

const router = express.Router();
router.get(
  "/api-gateway/current-user/exercise/",
  (req: Request, res: Response) => {
    res.send({ message: "currentUserExercise" });
  }
);
router.post(
  "/api-gateway/current-user/exercise/",
  async (req: Request, res: Response) => {
    const {
      exerciseCategory,
      exerciseName,
      level,
      type,
      direction,
      modality,
      joint,
    } = req.body;

    //const user = new User();
    //const ret = user.signUp();
    //const createdUser = UserSchema.build(user);
    const createdExercise = exerciseModel.build({
      exerciseCategory,
      exerciseName,
      level,
      type,
      direction,
      modality,
      joint,
    });
    await createdExercise.save();

    res.status(201).send({ createdExercise });
  }
);

export { router as currentUserRouter };
