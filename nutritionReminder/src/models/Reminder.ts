import {ExerciseScheduleAttrs,exerciseScheduleModel } from "./exercise-repo/exercise-reminder-repo";

export class Reminder {
  constructor() {}
  
  public sortDates() {
    const data = exerciseScheduleModel.find({}).sort();
    console.log("run");
  } 
}
