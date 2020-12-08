import express, { Request, Response } from "express";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulee/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const schedule = await exerciseScheduleModel.findById(req.params.id);
    if (req.currentUser!.id !== schedule!.userId) {
      throw new UnAuthorizedError("required authorization");
    }
    const { n, ok, deletedCount } = await exerciseScheduleModel.deleteOne({
      _id: req.params.id,
    });

    if (!n) {
      throw new UnknownRouteError("scheduleid not found");
    }

    res.send({ n, ok, deletedCount });
  }
);
export { router as deleteRouter };
