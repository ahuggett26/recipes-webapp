import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Recipe from "../model/Recipe";
import { AppState, AppThunk } from "./Store";

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
 * @returns The total amount of recipes in the database
 */
export const selectRecipeCount = (state: AppState) => {
  return state.recipes.recipes.length;
};

/**
 * Fetch a recipe from the database by its index.
 *
 * @returns The recipe at the given index
 */
export const selectRecipeByIndex = (state: AppState, index: number) => {
  return state.recipes.recipes[index];
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

/**
 * Fetch recipes by its ingredients
 *
 * @param ingredient1 The first ingredient search (must be provided)
 * @param ingredient2 The secon ingredient search (optional)
 * @param ingredient3 The third ingredient search (optional)
 * @returns The list of recipes containing one of the given ingredients
 */
export const selectRecipesByIngredients = (
  state: AppState,
  ingredient1: string,
  ingredient2?: string | undefined,
  ingredient3?: string | undefined,
) => {
  const recipesSet = new Set<Recipe>();
  const filterIngs = [ingredient1, ingredient2, ingredient3];
  for (const i of filterIngs) {
    if (!i || i === "") {
      continue;
    }
    const ingName = i.toLowerCase();
    state.recipes.recipes
      .filter((r) => {
        const foundIng = r.mainIngredients
          .concat(r.secondaryIngredients ?? [])
          .find((ing) => ing.name.toLowerCase().includes(ingName));
        return foundIng != undefined;
      })
      .forEach((recipe) => recipesSet.add(recipe));
  }
  return Array.from(recipesSet);
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
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
      state.recipeReadiness = "success";
    },
    setRecipesError: (state) => {
      state.recipeReadiness = "error";
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
  },
});

/**
 * Initial load of recipes from Firebase
 */
export const fetchRecipes = (): AppThunk<void> => async (dispatch, getState) => {
  const firebaseService = getState().firebase.firebaseService;
  const recipesPromise = firebaseService.fetchAllRecipes();
  recipesPromise.catch(() => dispatch(recipeSlice.actions.setRecipesError()));
  const response = await recipesPromise;

  // The value we return becomes the `fulfilled` action payload
  const r = response.docs.map((doc) => doc.data() as Recipe);
  console.log("AJH recipes converted: ", r);
  dispatch(recipeSlice.actions.setRecipes(r));
};
