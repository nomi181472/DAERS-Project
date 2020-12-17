import express, { Router, Request, Response } from 'express';
import {Reminder} from "../models/reminder";
const route = Router();
route.get("/api-gateway/current-user/exercise-schedule/reminder", (req: Request, res: Response) => {
  const reminder = new Reminder();
  reminder.sortDates();
  res.sendStatus(200);


});


export { route as sortRouter };