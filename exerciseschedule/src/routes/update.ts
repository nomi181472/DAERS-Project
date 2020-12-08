import express, { Request, Response } from "express";
import {
  exerciseScheduleModel,
  exerciseScheduleSchema,
} from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { body } from "express-validator";
const router = express.Router();
router.put(
  "/api-gateway/current-user/schedulee/:id",
  async (req: Request, res: Response): Promise<void> => {
    const schedule = await exerciseScheduleModel.findById(req.params.id);
    if (!schedule) {
      throw new UnknownRouteError("id not found");
    }
    // if (schedule.userId !== req.currentUser!.id) {
    //   throw new UnAuthorizedError();
    // }

    const dayR = req.body.document[0].sameDay;
    console.log(dayR);
    const { document } = schedule;
    //console.log(document[0].day);

    //console.log(documentFromBody[0].day);

    //const dateFromReq = Object.keys(documentFromBody[0])[0]; ///alwasy 0 index

    let index: number = -1;
    for (var i = 0; i < document.length; i++) {
      document[i].sameDay;
      if (dayR === document[i].sameDay) {
        index = i;
        // console.log(document[i]);
        break;
      }
    }
    if (index >= 0) {
      // let index2: number = -1;
      // for (var i = 0; i < document[index].day.length; i++) {
      //   if (
      //     document[index].day[i].sameExercise ===
      //     req.body.document[0].day[0].sameExercise
      //   ) {
      //     index2 = i;
      //     break;
      //   }
      // }
      // if (index2 >= 0) {
      //   console.log("yes");
      //   console.log(document[index].day[index2]);
      // } else {
      //   document[index].day.push(req.body.document[0].day[0]);
      //   console.log(document[index].day);
      // }
      document[index].day.push(req.body.document[0].day[0]);
      //console.log(document[index].day);
    } else {
      //if not same day
      document.push(req.body.document[0]);
    }
    // console.log(index);

    //console.log(document);
    await schedule.save();
    res.send({ schedule });
  }
);
export { router as updateRouter };
