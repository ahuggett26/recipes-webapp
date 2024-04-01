import { Ingredient } from "./Ingredient";
import Nutrition from "./Nutrition";

/** Information representing an individual recipe. */
export default interface Recipe {
  /** The name of the recipe. */
  name: string;
  /** The recipe description. */
  description?: string;
  /** Image URL source depicting the recipe. */
  imgSrc?: string;
  /** A URL link to the original recipe. */
  link?: string;
  /** The rough preparation time, in minutes. */
  prepTimeMins?: number;
  /** The rough cook time, in minutes. */
  cookTimeMins: number;
  /** The amount of servings in the recipe, as given by the original recipe. */
  servings: number;
  /** Nutritional information of the recipe. */
  nutrition?: Nutrition;
  /** The main ingredients in the recipe. */
  mainIngredients: Array<Ingredient>;
  /** Secondary (non-required) ingredients in the recipe. */
  secondaryIngredients?: Array<Ingredient>;
  /** Steps required to make the recipe. */
  steps: Array<string>;
}
