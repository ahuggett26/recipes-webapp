import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Recipe from "../model/Recipe";
import FirebaseService from "../service/FirebaseService";
import { AppState } from "./Store";

// Define the TS type for the recipe slice's state
export interface RecipeState {
  // All recipes.
  recipes: Recipe[];
  // Determines if the recipes have been loaded yet, and if it was loaded succesfully.
  recipeReadiness: "pending" | "error" | "success";
}

/**
 * Fetch a random recipe from the database.
 *
 * @returns A single, random recipe
 */
export const selectRecipeReadiness = (state: AppState) => {
  return state.recipes.recipeReadiness;
};

/**
 * Fetch a random recipe from the database.
 *
 * @returns A single, random recipe
 */
export const selectRandomRecipe = (state: AppState) => {
  const randomIndex = Math.floor(Math.random() * state.recipes.recipes.length);
  return state.recipes.recipes[randomIndex];
};

/**
 * Fetch a recipe by the name. The name must match.
 *
 * @param name The name of the recipe
 * @returns The matching recipe object
 */
export const selectRecipeByName = (state: AppState, name: string) => {
  return state.recipes.recipes.find((recipe) => recipe.name === name);
};

/**
 * Fetch recipes from a given name search input.
 *
 * The recipe name doesn't need to exactly match, it only needs to include the search.
 *
 * @param name The name to match
 * @returns All recipes containing the input name.
 */
export const selectRecipesByNameIncludes = (state: AppState, nameIncludes: string) => {
  const query = nameIncludes.toLowerCase();
  return state.recipes.recipes.filter((recipe) => recipe.name.includes(query));
};

/** Redux reducer function for initialising global state storage */
export const addRecipe = (recipe: Recipe) => recipeSlice.actions.addRecipe(recipe);

/** Redux reducer function for initialising global state storage */
export const recipeReducer = () => recipeSlice.reducer;

/**
 * Redux slice state for managing recipe state
 */
const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    recipeReadiness: "pending",
  } as RecipeState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(fetchRecipes.pending, (state) => {
        state.recipeReadiness = "pending";
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload;
        state.recipeReadiness = "success";
      })
      .addCase(fetchRecipes.rejected, (state) => {
        if (state.recipes.length == 0) {
          state.recipeReadiness = "error";
        }
      });
  },
});

/**
 * Initial load of recipes from firebase
 */
export const fetchRecipes = createAsyncThunk("fetchRecipes", async (firebaseService: FirebaseService) => {
  const response = await firebaseService.fetchAllRecipes();

  // The value we return becomes the `fulfilled` action payload
  const r = response.docs.map((doc) => doc.data() as Recipe);
  console.log("AJH recipes converted: ", r);
  return r;
});
