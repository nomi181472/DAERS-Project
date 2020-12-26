import { isConstTypeReference } from "typescript";
import { ExerciseScheduleAttrs, exerciseScheduleModel } from "./exercise-repo/exercise-reminder-repo";

export class Reminder {
  constructor() { }
  byDate(a: any, b: any) {
    const aa = new Date(a.sameDay)
    const bb = new Date(b.sameDay)

    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
  }
  filterDate(a: any) {
    const aa = new Date(a.sameDay)
    var bb = new Date().toISOString().substring(0, 10);
    var datt = new Date(bb)
    //console.log(aa);
    if (aa >= datt) {
      return aa
    }


    return 0;
  }
  public async sortDates(id: any) {

    const data = await exerciseScheduleModel.findById(id).select("document.sameDay");
    if (data) {

      var dat = data!.document.sort(this.byDate)
      var datt2 = dat.filter(this.filterDate)
      if (datt2.length)
        return datt2
      return "No-Date";
    }
    else
      return null;
  }
  public async countRemaining(id: any) {
    const data = await exerciseScheduleModel.findById(id).select("document.sameDay");

    return 30 - data!.document.length;
  }
  public async reScheduleE(id: any) {
    const dates = await this.sortDates(id);

    if (dates === "No-Date") {
      if (await this.countRemaining(id)) {
        const a = new Date()
        a.setDate(a.getDate() + 1)
        console.log(a)
        const data = await exerciseScheduleModel.findById(id)
        if (data) {
          const originalArr = ["Iron", "Super", "Ant", "Aqua"];
          originalArr.forEach((name, index) => originalArr[index] = `${name}man`);

          console.log("Overridden: %s", originalArr);
        }
      }
      else {
        return "Create-Schedule"
      }
    }
    else {
      return "Some Dates are left";
    }

  }
}
