import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { recipeReducer, RecipeState } from "./RecipeSlice";
import { ingredientReducer, IngredientState } from "./IngredientSlice";
import { adminReducer, AdminState } from "./AdminSlice";
import { firebaseReducer, FirebaseState } from "./FirebaseSlice";

/**
 * Redux global state store object
 */
export const store = configureStore({
  reducer: {
    recipes: recipeReducer(),
    ingredients: ingredientReducer(),
    admin: adminReducer(),
    firebase: firebaseReducer(),
  },
});

export interface AppState {
  recipes: RecipeState;
  ingredients: IngredientState;
  admin: AdminState;
  firebase: FirebaseState;
}

export type RecipeDispatch = ThunkDispatch<RecipeState, undefined, UnknownAction>;
export type IngredientDispatch = ThunkDispatch<IngredientState, undefined, UnknownAction>;
export type AdminDispatch = ThunkDispatch<AdminState, undefined, UnknownAction>;
