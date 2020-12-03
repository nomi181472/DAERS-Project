import express, { Request, Response } from "express";
import { nutritionFactModel } from "../models/nutritionfacts-repo";
const route = express.Router();
route.get(
  "/api-gateway/current-user/nutritionfact",
  (req: Request, res: Response) => {
    res.send({ message: "nutritionFact" });
  }
);
route.post(
  "/api-gateway/current-user/nutritionfact",
  async (req: Request, res: Response) => {
    const { nutritionCategory, nutritionName, water } = req.body;

    //const user = new User();
    //const ret = user.signUp();
    //const createdUser = UserSchema.build(user);
    const createdNutrition = nutritionFactModel.build({
      nutritionCategory,
      nutritionName,
      water,
    });
    await createdNutrition.save();
    //console.log(createdNutrition);
    res.status(201).send({ createdNutrition });
  }
);

export { route as currentUserRouter };
