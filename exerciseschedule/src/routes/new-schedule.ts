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
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId, document } = req.body;
    //const usId = req.currentUser!.id;
    let result = await exerciseScheduleModel.build({ document, userId });

    //console.log(result);
    await result.save();

    res.status(201).send({ result });
  }
);

export { router as newSchedule };
