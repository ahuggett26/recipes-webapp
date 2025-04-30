import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { recipeReducer, RecipeState } from "./RecipeSlice";
import { ingredientReducer, IngredientState } from "./IngredientSlice";

/**
 * Redux global state store object
 */
export const store = configureStore({
  reducer: {
    recipes: recipeReducer(),
    ingredients: ingredientReducer(),
  },
});

export interface AppState {
  recipes: RecipeState;
  ingredients: IngredientState;
}

export type RecipeDispatch = ThunkDispatch<RecipeState, undefined, UnknownAction>;
export type IngredientDispatch = ThunkDispatch<IngredientState, undefined, UnknownAction>;
