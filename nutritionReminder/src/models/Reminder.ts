import {nutritionScheduleModel,NutritionFactsScheduleAttrs } from "./nutrition-repo/nutrition-schedule";

export class Reminder {
  constructor() {}
  
  public async sortDates(id: any) {
    
    const data = await nutritionScheduleModel.findById(id).select("document.sameDay");

    function byDate(a: any, b: any) {
      const aa = new Date(a.sameDay)
      const bb=new Date(b.sameDay)
      
      if (aa < bb) return -1; 
      if (aa > bb) return 1; 
      return 0;  
  }
    return data!.document.sort(byDate)
  } 
  public async countRemaining(id: any)
  {
    //console.log("run")
    const data = await nutritionScheduleModel.findById(id).select("document.sameDay");
    //console.log(data);
    return 30 - data!.document.length;
  } 
}
    