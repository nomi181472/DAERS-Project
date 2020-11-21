import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema(
  {
    exerciseCategory: {
      type: String,
    },
    exerciseName: {
      type: String,
    },
    level: {
      type: Number,
    },
    type: {
      type: String,
    },
    direction: {
      type: String,
    },
    modality: {
      type: String,
    },
    joint: {
      type: String,
    },
    targetMuscleName: {
      type: [String],
    },
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    photos: {
      photosUrl: [String],
      mainPhoto: String,
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret._id;
      },
    },
  }
);

interface ExerciseAttrs {
  exerciseCategory: string;
  exerciseName: string;
  level: number;
  type: string;
  direction: string;
  modality: string;
  joint: string;

  targetMuscleName?: [string];
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {};
}
interface ExerciseDocument extends mongoose.Document {
  exerciseCategory: string;
  exerciseName: string;
  level: number;
  type: string;
  direction: string;
  modality: string;
  joint: string;
  targetMuscleName?: [string];
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {};
}

interface ExerciseModel extends mongoose.Model<ExerciseDocument> {
  build(exercise: ExerciseAttrs): ExerciseDocument;
}
exerciseSchema.statics.build = (exercise: ExerciseAttrs) => {
  return new exerciseModel(exercise);
};
//const exerciseModel = mongoose.model("exercise", exerciseSchema);
const exerciseModel = mongoose.model<ExerciseDocument, ExerciseModel>(
  "exercise",
  exerciseSchema
);
export { exerciseModel };
