/** 
 * Nutritional information of a recipe.
 * 
 * This information is per portion, so should not change with serving count.
 */
export default interface Nutrition {
  /** Calories in a recipe. */
  kcal: number;
  /** The protein count in a recipe. */
  protein: number;
}
