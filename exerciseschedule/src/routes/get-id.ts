import express, { Request, Response } from "express";

import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import mongoose from "mongoose";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee/:id",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const idd = new mongoose.Types.ObjectId().toHexString();
    console.log(id);
    const schedulee = await exerciseScheduleModel.findById(id);
    if (!schedulee) {
      throw new UnknownRouteError("id not found");
    }
    res.send({ schedulee });
  }
);
export { router as getIdRouter };
