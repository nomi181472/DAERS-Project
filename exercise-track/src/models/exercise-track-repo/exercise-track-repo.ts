import mongoose from "mongoose";
const exerciseTrackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    
    weightCapacity:[{
      exerciseName: String,
      weight: [Number]
    }],
    totalRunning: [{
      date: [String],
      running:[Number]
      
    }],

  
    createAt: Date,
    updateAt: Date,
  },
  {
     
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);
interface ExerciseTrackAttrs {
  userId: string;
  weightCapacity:{
    exerciseName: string,
    weight: number[]
  }[],
  totalRunning: {
    date: string[],
    running:number[]
    
  }[],
  createAt?: Date;
  updateAt?: Date;

}
interface ExerciseTrackDocument extends mongoose.Document {
 
  userId: string;
  dayDate: string[],
  totalCaloriesIntake: number[],
  totalProteinIntake: number[],
  totalCarbohydratesIntake: number[],
  totalFatsIntake: number[],
  currentWeight: number[],
  
  createAt?: Date;
  updateAt?: Date;
  
 
 
}

interface ExerciseTrackModel
  extends mongoose.Model<ExerciseTrackDocument> {
  build(exerciseTrack: ExerciseTrackAttrs): ExerciseTrackDocument;
}
exerciseTrackSchema.statics.build = (exerciseTrack: ExerciseTrackAttrs) => {
  return new exerciseTrackModel(exerciseTrack);
};

const exerciseTrackModel = mongoose.model<
ExerciseTrackDocument,
ExerciseTrackModel
>("exercisetrack", exerciseTrackSchema);
export { exerciseTrackModel, ExerciseTrackAttrs, exerciseTrackSchema };
