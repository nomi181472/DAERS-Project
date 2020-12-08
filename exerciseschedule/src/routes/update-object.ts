import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
const router = express.Router();
router.put(
  "/api-gateway/current-user/schedulee/object/:id/:exerciseId",
  async (req: Request, res: Response) => {
    const schedule = await exerciseScheduleModel.findById(req.params.id);
    if (!schedule) {
      throw new UnknownRouteError("id not found");
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
      throw new UnknownRouteError("not same day");
    }
    if (index >= 0) {
      let index2: number = -1;
      for (var i = 0; i < document[index].day.length; i++) {
        if (document[index].day[i].sameExercise === req.params.exerciseId) {
          index2 = i;
          break;
        }
      }

      if (index2 >= 0) {
        //console.log("yes");
        //console.log("before", document[index].day[index2]);
        schedule.document[index].day[index2] = req.body.document[0].day[0];
        //document[index].day[index2].sameExercise = req.body.document[0].day[0];
        // console.log(req.body.document[0].day[0]);
        console.log(document[index].day[index2]);
      }

      //else {
      //   document[index].day.push(req.body.document[0].day[0]);
      //   console.log(document[index].day);
      // }
      // document[index].day.push(req.body.document[0].day[0]);
      //console.log(document[index].day);
    }
    await schedule.save();
    res.send({ schedule });
  }
);
export { router as updateObjectRouter };
