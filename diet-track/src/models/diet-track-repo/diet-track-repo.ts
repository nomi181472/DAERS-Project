import mongoose from "mongoose";
const dietTrackSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    dietScheduleId: {
      type: String,
      required: true,
    },
    dayDate: [String],
    totalCaloriesIntake: [Number],
    totalProteinIntake: [Number],
    totalCarbohydratesIntake: [Number],
    totalFatsIntake: [Number],
    currentWeight: [Number],
    createAt: Date,
    updateAt: Date,
  },
  {
     _id: false ,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);
interface DietTrackAttrs {
  _id: string;
  dietScheduleId: string,
  dayDate: string[],
  totalCaloriesIntake: number[],
  totalProteinIntake: number[],
  totalCarbohydratesIntake: number[],
  totalFatsIntake: number[],
  currentWeight: number[],
  createAt?: Date;
  updateAt?: Date;

}
interface DietTrackDocument extends mongoose.Document {
 
  _id: string;
  dietScheduleId: string,
  dayDate: string[],
  totalCaloriesIntake: number[],
  totalProteinIntake: number[],
  totalCarbohydratesIntake: number[],
  totalFatsIntake: number[],
  currentWeight: number[],
  
  createAt?: Date;
  updateAt?: Date;
  
 
 
}

interface DietTrackModel
  extends mongoose.Model<DietTrackDocument> {
  build(dietTrack: DietTrackAttrs): DietTrackDocument;
}
dietTrackSchema.statics.build = (dietTrack: DietTrackAttrs) => {
  return new dietTrackModel(dietTrack);
};

const dietTrackModel = mongoose.model<
  DietTrackDocument,
  DietTrackModel
>("diettrack", dietTrackSchema);
export { dietTrackModel, DietTrackAttrs, dietTrackSchema };
