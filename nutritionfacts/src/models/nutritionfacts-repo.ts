import mongoose from "mongoose";
const nutritionfactSchema = new mongoose.Schema(
  {
    nutritionCategory: {
      type: String,
    },
    nutritionName: {
      type: String,
    },
    fatsSub: {
      type: {},
    },
    fats: {
      type: mongoose.Schema.Types.Decimal128,
    },
    sugarsSub: {
      type: {},
    },
    sugars: {
      type: mongoose.Schema.Types.Decimal128,
    },
    totalLipids: {
      type: mongoose.Schema.Types.Decimal128,
    },
    mineralsCategory: {
      type: {},
    },
    vitaminCategory: {
      type: {},
    },
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    carbohydrates: {
      type: mongoose.Schema.Types.Decimal128,
    },
    cholestrol: {
      type: mongoose.Schema.Types.Decimal128,
    },
    fiber: {
      type: mongoose.Schema.Types.Decimal128,
    },
    calories: {
      type: mongoose.Schema.Types.Decimal128,
    },
    proteinCategory: {
      type: {},
    },
    protein: {
      type: mongoose.Schema.Types.Decimal128,
    },
    water: {
      type: mongoose.Schema.Types.Decimal128,
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

interface NutritionFactAttrs {
  nutritionCategory: string;
  nutritionName: string;
  fatsSub?: {};
  fats?: number;
  sugarsSub?: {};
  sugars?: number;
  totalLipids?: number;

  mineralsCategory?: {};
  createdAt?: Date;
  updatedAt?: Date;
  carbohydrates?: number;
  cholestrol?: number;
  fiber?: number;
  calories?: number;
  proteinCategory?: {};
  protein?: number;
  water?: number;
  photos?: {};
}
interface NutritionFactDocument extends mongoose.Document {
  nutritionCategory: string;
  nutritionName: string;
  fatsSub?: {};
  fats?: number;
  sugarsSub?: {};
  sugars?: number;
  totalLipids?: number;

  mineralsCategory?: {};
  createdAt?: Date;
  updatedAt?: Date;
  carbohydrates?: number;
  cholestrol?: number;
  fiber?: number;
  calories?: number;
  proteinCategory?: {};
  protein?: number;
  water?: number;
  photos?: {};
}

interface NutritionFactModel extends mongoose.Model<NutritionFactDocument> {
  build(nutrition: NutritionFactAttrs): NutritionFactDocument;
}
nutritionfactSchema.statics.build = (nutrition: NutritionFactAttrs) => {
  return new nutritionFactModel(nutrition);
};

const nutritionFactModel = mongoose.model<
  NutritionFactDocument,
  NutritionFactModel
>("nutritionfacts", nutritionfactSchema);
export { nutritionFactModel };
