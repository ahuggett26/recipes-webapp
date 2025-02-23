import DietaryInfo from "./DietaryInfo";
import { Measurement } from "./Measurement";
import Nutrition from "./Nutrition";

/**
 * Information related to a single ingredient.
 *
 * This information is standalone and can be applied to all recipes.
 * As a result, it is not impacted by serving sizes etc.
 */
export default interface IngredientInfo {
  /** Name of the ingredient */
  name: string;
  /** Dietary information related to the ingredient */
  dietary: DietaryInfo;
  /** Nutritional information related to the ingredient */
  nutrition: Nutrition;
  /** The reference for this ingredient */
  reference: {
    /**
     * The reference amount of the ingredient.
     * This does not have to match any expected serving size, instead it is simply to
     * serve the calculation of nutrition. e.g 100 kcal from 50g, makes 50g the reference.
     */
    amount: number;
    /**
     * Measurement of the reference amount.
     * This will also be used as the default measurement for the ingredient in recipes.
     */
    measurement: Measurement;
  };
}
