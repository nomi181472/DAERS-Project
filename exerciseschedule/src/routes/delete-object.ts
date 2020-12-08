import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { requireAuth } from "../middlewares/require-auth";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulee/object/:id/:exerciseId",
  requireAuth,
  async (req: Request, res: Response) => {
    const schedule = await exerciseScheduleModel.findById(req.params.id);
    if (!schedule) {
      throw new UnknownRouteError("scheduleid not found");
    }
    if (req.currentUser!.id !== schedule!.userId) {
      throw new UnAuthorizedError("required authorization");
    }
    const dayR = req.body.document[0].sameDay;
    //console.log(req.params.exerciseId);
    const { document } = schedule;
    let index: number = -1;
    for (var i = 0; i < document.length; i++) {
      document[i].sameDay;
      if (dayR === document[i].sameDay) {
        index = i;
        // console.log(document[i]);
        break;
      }
    }

    if (index === -1) {
      throw new UnknownRouteError("day does not exist");
    }
    if (index >= 0) {
      let index2: number = -1;
      for (var i = 0; i < document[index].day.length; i++) {
        if (document[index].day[i].sameExercise === req.params.exerciseId) {
          index2 = i;
          break;
        }
      }
      const len = document[index].day.length;
      console.log(document[index].day.length);
      if (index2 >= 0) {
        schedule.document[index].day.splice(index2, 1);
        if (len <= 1) {
          schedule.document.splice(index, 1);
        }
      } else {
        throw new UnknownRouteError("exerciseid is not same");
      }
    }
    await schedule.save();

    res.sendStatus(200);
  }
);
export { router as deleteObjectRouter };
