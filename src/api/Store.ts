import { configureStore, ThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { recipeReducer, RecipeState } from "./RecipeSlice";
import { ingredientReducer, IngredientState } from "./IngredientSlice";
import { adminReducer, AdminState } from "./AdminSlice";

/**
 * Redux global state store object
 */
export const store = configureStore({
  reducer: {
    recipes: recipeReducer(),
    ingredients: ingredientReducer(),
    admin: adminReducer(),
  },
});

export interface AppState {
  recipes: RecipeState;
  ingredients: IngredientState;
  admin: AdminState;
}

export type AppDispatch = ThunkDispatch<AppState, undefined, UnknownAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, UnknownAction>;
