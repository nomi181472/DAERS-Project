import {
  nutritionScheduleModel,
  NutritionFactsScheduleAttrs,
} from "./nutrition-schedule-repo/nutrition-schedule";
export class NutritionFactsSchedule {
  constructor() {}
  public async addSchedule(nutritionScheduleAttr: NutritionFactsScheduleAttrs) {
    try {
      let result = await nutritionScheduleModel.build(nutritionScheduleAttr);
      await result.save();
      return result;
    } catch (err) {
      console.log("addschedule Class", err);
      return null;
    }
  }
  public async listSchedules() {
    try {
      const schedule = await nutritionScheduleModel.find({});
      return schedule;
    } catch (err) {
      console.log("List Schedule", err);
      return null;
    }
  }
  public async getScheduleId(id: String) {
    try {
      const schedulee = await nutritionScheduleModel.findById(id);
      return schedulee;
    } catch (err) {
      console.log("getSchduleId", err);
      return 0;
    }
  }
  private findSameDay(document: any, dayR: any) {
    let index: number = -1;
    for (var i = 0; i < document.length; i++) {
      document[i].sameDay;
      if (dayR === document[i].sameDay) {
        index = i;

        break;
      }
    }
    return index;
  }
  public async updatechedule(scheduleId: String, userId: String, body: any) {
    try {
      const schedule = await nutritionScheduleModel.findById(scheduleId);
      if (!schedule) {
        return "id-not-found";
      }

      if (userId !== schedule!.userId) {
        return "required-authorization";
      }

      const dayR = body.document[0].sameDay;

      const { document } = schedule;

      let index: number = this.findSameDay(document, dayR);

      if (index >= 0) {
        const dayTime = body.document[0].day[0].dayTime;
        
        let index2: number = this.findSameTime(document[index].day, dayTime);

        if (index2 >= 0) {
          
          document[index].day[index2].time.push(body.document[0].day[0].time[0]);
          console.log(body.document[0].day[0].time[0]);
        } else {
          document[index].day.push(body.document[0].day[0]);
        }
      } else {
        //if not same day
        document.push(body.document[0]);
      }

      await schedule.save();
      return schedule;
    } catch (err) {
      console.log("updateschedule", err);
      return null;
    }
  }
  private findSameTime(document: any, dayTime: any) {
    let index: number = -1;
    for (var i = 0; i < document.length; i++) {
      if (document[i].dayTime === dayTime) {
        index = i;
        break;
      }
    }

    return index;
  }
  private findSameNutritionFact(
    document: any,
    index: number,
    indexB: number,
    nutritionId: String
  ) {
    let index2: number = -1;

    for (var i = 0; i < document[index].day[indexB].time.length; i++) {
      if (document[index].day[indexB].time[i].sameNutrition === nutritionId) {
        index2 = i;
        break;
      }
    }
    return index2;
  }
  public async updateScheduleObject(
    scheduleId: String,
    body: any,
    nutritionId: String,
    currentUserId: String
  ) {
    try {
      const schedule = await nutritionScheduleModel.findById(scheduleId);
      const dayR = body.document[0].sameDay;

      const document = schedule!.document;

      if (!schedule) {
        return "not-found";
      }

      if (currentUserId !== schedule!.userId) {
        return "required-authorization";
      }
      let index: number = this.findSameDay(document, dayR);

      if (index === -1) {
        return "not-same-day";
      }
      let indexB: number = -1;
      let index2: number = -1;
      if (index >= 0) {
        const dayTime = body.document[0].day[0].dayTime;
        indexB = this.findSameTime(document[index].day, dayTime);

        if (indexB >= 0) {
          index2 = this.findSameNutritionFact(
            document,
            index,
            indexB,
            nutritionId
          );

          if (index2 >= 0) {
            schedule.document[index].day[indexB].time[index2] =
              body.document[0].day[0].time[0];
          } else {
            return "nutritionId-notFound";
          }
        } else {
          return "dayTime-NotMatch";
        }
      }
      await schedule.save();
      return schedule.document[index].day[indexB].time[index2];
    } catch (err) {
      console.log("updating Object", err);
      return null;
    }
  }
  public async deleteSchedule(id: String, currentUserID: String) {
    try {
      const schedule = await nutritionScheduleModel.findById(id);

      if (!schedule) {
        return "not-found";
      }
      if (currentUserID !== schedule!.userId) {
        return "required-authorization";
      }
      const { n, ok, deletedCount } = await nutritionScheduleModel.deleteOne({
        _id: id,
      });
      return { n, ok, deletedCount };
    } catch (err) {
      console.log("deleting schedule ", err);
      return null;
    }
  }

  public async deleteScheduleObject(
    scheduleId: String,
    body: any,
    currentUserId: String,
    nutritionId: String
  ) {
    try {
      const schedule = await nutritionScheduleModel.findById(scheduleId);

      const dayR = body.document[0].sameDay;

      const document = schedule!.document;

      if (!schedule) {
        return "not-found";
      }

      if (currentUserId !== schedule!.userId) {
        return "required-authorization";
      }
      let index: number = this.findSameDay(document, dayR);
      if (index === -1) {
        return "not-same-day";
      }
      let indexB: number = -1;
      let index2: number = -1;
      const len = document[index].day.length;
      if (index >= 0) {
        const dayTime = body.document[0].day[0].dayTime;
        indexB = this.findSameTime(document[index].day, dayTime);

        if (indexB >= 0) {
          index2 = this.findSameNutritionFact(
            document,
            index,
            indexB,
            nutritionId
          );

          if (index2 >= 0) {
            schedule.document[index].day[indexB].time.splice(index2, 1);
            if (!schedule.document[index].day[indexB].time.length) {
              schedule.document[index].day.splice(indexB, 1);
              if (!schedule.document[index].day.length) {
                schedule.document.splice(index, 1);
              }
            }
          } else {
            return "nutritionId-notFound";
          }
        } else {
          return "dayTime-NotMatch";
        }
      }

      await schedule.save();
      return true;
    } catch (err) {
      console.log("updating Object", err);
      return null;
    }
  }
  public async getUserScheduleId(userId:string) {
    const schedule = await nutritionScheduleModel.find({ userId: userId });
    if (!schedule) {
      return "not-found";
    }
    return schedule;
  }
  
  public async deleteDay(id: string,day:string)
  {
    //console.log(day)
    console.log("schedule",id);
    const schedule = await nutritionScheduleModel.findById(id);
    if (schedule) {
      
      for (var i = 0; i < schedule!.document.length; i++) {
        
        if (schedule.document[i].sameDay === day) {
          const index = i
          //console.log(index);
          schedule.document.splice(index, 1);
          await schedule.save();
         // console.log(schedule);
          return true;
          
        }
        
      }
      return false
      
      
    
      
     
    }
    else {
      return false;
    }
   
    
  }
}

