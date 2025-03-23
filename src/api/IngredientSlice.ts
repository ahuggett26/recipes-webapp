import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IngredientInfo from "../model/IngredientInfo";
import FirebaseService from "../service/FirebaseService";

// Define the TS type for the recipe slice's state
interface IngredientState {
  // All ingredients. Undefined = not loaded, null = error loading.
  ingredients: IngredientInfo[] | undefined | null;
}

/**
 * Fetch all ingredients.
 *
 * @returns A list of all ingredients. Empty if not yet loaded.
 */
export const selectIngredients = (state: IngredientState) => {
  return state.ingredients ?? [];
};

/** Redux reducer function for initialising global state storage */
export const addIngredient = (ingredient: IngredientInfo) => ingredientSlice.actions.addIngredient(ingredient);

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
    addIngredient: (state, action: PayloadAction<IngredientInfo>) => {
      // Preferably, just insert in the right place
      state.ingredients?.push(action.payload);
      state.ingredients?.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(fetchIngredients.pending, (state) => {
        if (!state.ingredients) {
          state.ingredients = undefined;
        }
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientInfo[]>) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        if (!state.ingredients) {
          state.ingredients = null;
        }
      });
  },
});

/**
 * Initial load of ingredients from Firebase
 */
export const fetchIngredients = createAsyncThunk("fetchIngredients", async (firebaseService: FirebaseService) => {
  const response = await firebaseService.fetchAllIngredients();
  const ingredients = response.docs.map((doc) => doc.data() as IngredientInfo);
  ingredients.sort((a, b) => a.name.localeCompare(b.name));

  // The value we return becomes the `fulfilled` action payload
  return ingredients;
});
