import express, { Request, Response } from "express";
import { exerciseModel } from "../models/exercise-repo/exercise-repo";
const route = express.Router();
route.get(
  "/api-gateway/current-user/exercise",
  (req: Request, res: Response) => {
    res.send({ message: "exercise" });
  }
);
route.post(
  "/api-gateway/current-user/exercise",
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
    //console.log(createdNutrition);
    res.status(201).send({ createdExercise });
  }
);

export { route as currentUserRouter };
