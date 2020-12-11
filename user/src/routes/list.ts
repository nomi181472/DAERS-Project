import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { User } from "../models/user";

const router = express.Router();
router.get(
  "/api-gateway/current-user/userlist",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const u = new User();
    const user = await u.listExercise();

    if (!user || user === "empty") {
      throw new BadRequestError("error while listing");
    }
    res.status(200).send({ user });
  }
);
export { router as listUserRouter };
