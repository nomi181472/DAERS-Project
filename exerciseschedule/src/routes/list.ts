import express, { Request, Response } from "express";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";

const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee",
  async (req: Request, res: Response) => {
    const schedule = await exerciseScheduleModel.find({});
    res.send(schedule);
  }
);
export { router as listRouter };
