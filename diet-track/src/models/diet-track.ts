import { DietTrackParser } from "./argumentParser";
import { dietTrackModel,DietTrackAttrs } from "./diet-track-repo/diet-track-repo";


export class DietTrack{
  constructor() {
  
  }
  public async addNutritions(document: DietTrackParser) {
    const isCurrentUser = await dietTrackModel.findById( document.userId );
   
  
    console.log(isCurrentUser)
    if (!isCurrentUser) {
      
      const isAdd = await dietTrackModel.build({
        _id: document.userId,
        dietScheduleId: document.dietScheduleId,
        dayDate: [document.dayDate],
        totalProteinIntake: [document.totalProteinIntake],
        totalFatsIntake: [document.totalFatsIntake],
        totalCarbohydratesIntake: [document.totalCarbohydratesIntake],
        totalCaloriesIntake: [document.totalCaloriesIntake],
        currentWeight: [document.currentWeight]
      });
      await isAdd.save();
  
    
    }
    else {
     
      
        const index = isCurrentUser.dayDate.map((e, d) => { if (e === document.dayDate) return d })[0];
      console.log(index)
        if (index !== undefined) {
      
          isCurrentUser.totalProteinIntake[index] += 5;
          isCurrentUser.totalFatsIntake[index] += 5;
          isCurrentUser.totalCarbohydratesIntake[index] += 5;
          isCurrentUser.totalCaloriesIntake[index] += 5;
          isCurrentUser.currentWeight[index] += 5;
          isCurrentUser.markModified("totalProteinIntake");
          isCurrentUser.markModified("totalFatsIntake");
          isCurrentUser.markModified("totalCarbohydratesIntake");
          isCurrentUser.markModified("totalCaloriesIntake");
          isCurrentUser.markModified("currentWeight");
          isCurrentUser.save();
         
      }
        else {
          console.log("else")
          dietTrackModel.findOneAndUpdate(
            { _id: document.userId },
            {
              $push: {
                totalProteinIntake: document.totalProteinIntake, totalFatsIntake: document.totalFatsIntake,
                totalCarbohydratesIntake: document.totalCarbohydratesIntake, totalCaloriesIntake: document.totalCaloriesIntake,
                currentWeight:document.currentWeight
              }
            },
          ).exec();
      }
        
      
    }
    
  }
  public getTrackId() {
    return;
  }
  
}