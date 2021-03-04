import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();



router.post("/api-gateway/current-user/exercise-track/addWeight",
requireAuth, (req: Request, res: Response) => {
  const {
    userId,
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake,
    currentWeight } = req.body;
  const obj = new ExerciseTrack();
  const result=obj.addWeightCapacity();
  
 
  res.send({});
});

export { router as addWeightCapacity };
