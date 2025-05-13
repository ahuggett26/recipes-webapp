import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IngredientInfo from "../model/IngredientInfo";
import { AppState, AppThunk } from "./Store";
import { createIngredient, fetchAllIngredients } from "../service/FirebaseService";

// Define the TS type for the recipe slice's state
export interface IngredientState {
  // All ingredients. Undefined = not loaded, null = error loading.
  ingredients: IngredientInfo[] | undefined | null;
}

/**
 * Fetch all ingredients.
 *
 * @returns A list of all ingredients. Empty if not yet loaded.
 */
export const selectIngredients = (state: AppState) => {
  return state.ingredients.ingredients ?? [];
};

/**
 * @param state Redux app state.
 * @param ingredient The name of the ingredient to find.
 * @returns True if the given ingredient is in the ingredient database.
 */
export const selectIngredientExists = (state: AppState, ingredient: string) => {
  return selectIngredients(state).find((ing) => ing.name.toLowerCase() === ingredient.toLowerCase()) != undefined;
};

/** Redux reducer function for initialising global state storage */
export const ingredientReducer = () => ingredientSlice.reducer;

/**
 * Redux slice state for managing ingredient state
 */
const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: undefined,
  } as IngredientState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IngredientInfo[]>) => {
      state.ingredients = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientInfo>) => {
      // Preferably, just insert in the right place
      state.ingredients?.push(action.payload);
      state.ingredients?.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
});

/**
 * Adds an ingredient to the database.
 * Also ensures the ingredient is added to local state, so refetching is not necessary.
 */
export const addIngredient =
  (ingredient: IngredientInfo): AppThunk<void> =>
  (dispatch) => {
    createIngredient(ingredient);
    dispatch(ingredientSlice.actions.addIngredient(ingredient));
  };

/**
 * Initial load of ingredients from Firebase
 */
export const fetchIngredients = (): AppThunk<void> => async (dispatch) => {
  const response = await fetchAllIngredients();
  const ingredients = response.docs.map((doc) => doc.data() as IngredientInfo);
  ingredients.sort((a, b) => a.name.localeCompare(b.name));

  // The value we return becomes the `fulfilled` action payload
  dispatch(ingredientSlice.actions.setIngredients(ingredients));
};
