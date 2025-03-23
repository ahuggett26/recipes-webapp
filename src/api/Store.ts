import { configureStore } from "@reduxjs/toolkit";
import { recipeReducer } from "./RecipeSlice";
import { ingredientReducer } from "./IngredientSlice";

/**
 * Redux global state store object
 */
export const store = configureStore({
  reducer: {
    recipes: recipeReducer(),
    ingredients: ingredientReducer(),
  },
});
