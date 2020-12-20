import {ExerciseScheduleAttrs,exerciseScheduleModel } from "./exercise-repo/exercise-reminder-repo";

export class Reminder {
  constructor() {}
  
  public async sortDates(id: any) {
    
    const data = await exerciseScheduleModel.findById(id).select("document.sameDay");

    function byDate(a: any, b: any) {
      const aa = new Date(a.sameDay)
      const bb=new Date(b.sameDay)
      
      if (aa < bb) return -1; 
      if (aa > bb) return 1; 
      return 0;  
  }
    return data!.document.sort(byDate)
  } 
}
    