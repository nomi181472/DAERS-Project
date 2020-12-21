import { isConstTypeReference } from "typescript";
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
    function filterDate(a: any) {
      const aa = new Date(a.sameDay)
      var bb = new Date().toISOString().substring(0,10);
     var datt= new Date(bb)
      //console.log(aa);
      if (aa>=datt )
      {
       return aa 
        }
      
      
      return 0;  
    }
    var dat = data!.document.sort(byDate)
    var datt2= dat.filter(filterDate)
    console.log(datt2)
    return 
  } 
  public async countRemaining(id: any)
  {
    const data = await exerciseScheduleModel.findById(id).select("document.sameDay");
    
    return 30 - data!.document.length;
  } 
}
    