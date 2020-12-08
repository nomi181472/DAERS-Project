import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
const router = express.Router();
router.post(
  "/api-gateway/current-user/exerciseschedule",
  /*requireAuth,*/
  // [body("document").not().isEmpty().withMessage("document is required")],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { document } = req.body;
    const userId = req.currentUser!.id;
    //const schedule = exerciseScheduleModel.findById({ userId: userId });
    //console.log(schedule);
    let result = await exerciseScheduleModel.build({ document, userId });
    console.log(userId);

    await result.save();

    res.status(201).send({ result });
  }
);

export { router as newSchedule };
