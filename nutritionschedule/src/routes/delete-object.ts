import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { requireAuth } from "../middlewares/require-auth";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { body, param } from "express-validator";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulenf/object/:id/:nutritionId",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),

    body("document").not().isEmpty().withMessage("document is required"),
    body("document.*.sameDay").not().isEmpty().withMessage("Day is required"),
    body("document.*.day.*.time.*.nutrition")
      .not()
      .isEmpty()
      .withMessage("NutritionData is Required"),
    body("document.*.day.*.dayTime")
      .not()
      .isEmpty()
      .withMessage("DayTime is required"),
    body("document.*.day.*.time")
      .not()
      .isEmpty()
      .withMessage("time is required"),
    body("document.*.day.*.time.*.sameNutrition")
      .not()
      .isEmpty()
      .withMessage("nutritionId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    const schedule = await sch.deleteScheduleObject(
      req.params.id,
      req.body,
      req.currentUser!.id,
      req.params.nutritionId
    );

    if (schedule === "not-found") {
      throw new UnknownRouteError("scheduleid not found");
    }

    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
    }
    if (schedule === "not-same-day") {
      throw new UnknownRouteError("not a same day");
    }
    if (schedule === "dayTime-NotMatch") {
      throw new BadRequestError("dayTime mismatch");
    }
    if (schedule === "nutritionId-notFound") {
      throw new BadRequestError("nutritionId Not Found");
    }

    if (!schedule) {
      throw new BadRequestError("error while updating the object");
    }
    res.sendStatus(200);
  }
);
export { router as deleteObjectRouter };
