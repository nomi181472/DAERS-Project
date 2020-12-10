import {
  nutritionFactModel,
  NutritionFactAttrs,
} from "./nutritionfacts-repo/nutritionfacts-repo";

export class NutritionFacts {
  constructor() {}
  public async addNutritionFacts(nutrition: NutritionFactAttrs) {
    try {
      const nt = nutritionFactModel.build(nutrition);
      await nt.save();

      return nt;
    } catch (err) {
      console.log("ErrorPosition:addNutritionFacts", err);
      return null;
    }
  }
  public async updateNutritionFacts(
    nutrition: NutritionFactAttrs,
    nutritionId: String
  ) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }
      nt.set(nutrition);

      await nt.save();
      return nt;
    } catch (err) {
      console.log("ErrorPosition:updateNutritionFacts", err);
      return null;
    }
  }
  public async deleteNutritionFacts(nutritionId: String) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }
      const { n, ok, deletedCount } = await nutritionFactModel.deleteOne({
        _id: nutritionId,
      });

      return true;
    } catch (err) {
      console.log("ErrorPosition:deleteNutritionFacts", err);
      return null;
    }
  }
  public async detailNutrition(nutritionId: String) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }

      return nt;
    } catch (err) {
      console.log("ErrorPosition:detailNutrition", err);
      return null;
    }
  }
  public async listNutritionFacts() {
    try {
      const nt = await nutritionFactModel.find({});
      if (!nt) {
        return "empty";
      }

      return nt;
    } catch (err) {
      console.log("ErrorPosition:listNutritionFacts", err);
      return null;
    }
  }
}
