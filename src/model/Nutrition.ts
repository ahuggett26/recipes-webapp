/**
 * Nutritional information.
 */
export default interface Nutrition {
  /** Calories in an ingredient/recipe. */
  kcal: number;
  /** Total grams of protein in an ingredient/recipe. */
  protein: number;
  /** Total grams of fat in an ingredient/recipe. */
  fat: number;
  /** Total grams of saturated fat in an ingredient/recipe. */
  sat_fat: number;
  /** Total grams of fibre in an ingredient/recipe. */
  fibre: number;
}
