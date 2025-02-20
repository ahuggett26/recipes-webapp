/**
 * Dietary information related to the ingredient/recipe.
 */
export default interface DietaryInfo {
  /** True if the ingredient/recipe is considered OK for a pescetarian diet. */
  pescetarian: boolean;
  /** True if the ingredient/recipe is considered OK for a vegan diet. */
  vegan: boolean;
  /** True if the ingredient/recipe is considered OK for a vegetarian diet. */
  vegetarian: boolean;
}
