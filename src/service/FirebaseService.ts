import { initializeApp } from "firebase/app";
import Recipe from "../model/Recipe";
import { getFirestore, collection, getDocs, setDoc, doc, Firestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./FirebaseConfig";
import SettingsDefinition from "../components/admin/SettingsDefinition";
import IngredientInfo from "../model/IngredientInfo";

/**
 * Service for accessing the firebase database.
 */
class FirebaseService {
  /** Firestore database. */
  firestore: Firestore;
  /** All recipes in the database, organised in a map keyed by the recipe name. */
  recipesByName: Map<string, Recipe> = new Map();
  /**
   * All recipes in the database, keyed by ingredients, mapped to recipes containing those ingredients.
   * If the ingredient is not in the ingredient database, the recipe will not be stored here.
   */
  recipesByIngredients: Map<string, Recipe[]> = new Map();
  /** An array of all the ingreients across all recipes. */
  allIngredients: IngredientInfo[] = [];
  /** Boolean variable representing if the database data has been loaded in. */
  loaded = false;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
    this.fetchAllIngredients().then(() => this.fetchAllRecipes());
    return this;
  }

  /**
   * Fetch all recipes in the database & load into the respective recipe objects.
   */
  async fetchAllRecipes() {
    const query = await getDocs(collection(this.firestore, "recipes"));
    query.forEach((res) => {
      const recipe = res.data() as Recipe;
      this.recipesByName.set(recipe.name.toLowerCase(), recipe);
      recipe.mainIngredients.forEach((ing) => {
        const ingName = ing.name.toLowerCase();
        if (this.allIngredients.filter((i) => i.name.toLowerCase() === ingName).length > 0) {
          const matches = this.recipesByIngredients.get(ingName);
          this.recipesByIngredients.set(ingName, [...(matches ?? []), recipe]);
        }
      });
    });
    this.loaded = true;
  }

  /**
   * Fetch all ingrediets in the database and load them into
   */
  async fetchAllIngredients() {
    const query = await getDocs(collection(this.firestore, "ingredients"));
    query.forEach((ing) => this.allIngredients.push(ing.data() as IngredientInfo));
    this.allIngredients.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Wait until all recipes have been loaded, with a maximum of 100 second wait.
   *
   * @returns A promise containing if the recipes have been loaded or not
   */
  async waitUntilRecipesLoaded() {
    let delays = 0;
    while (!this.loaded && delays < 400) {
      delays++;
      // Wait 250 millis until recipes have been loaded
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    if (!this.loaded) {
      return false;
    }
    return true;
  }

  /**
   * Fetch all ingredient from ingredient storage.
   *
   * @returns All recipes containing the input name.
   */
  getAllIngredients() {
    return this.allIngredients;
  }

  /**
   * Fetch recipes from a given name search input.
   *
   * The recipe name doesn't need to exactly match, it only needs to include the search.
   *
   * @param name The name to match
   * @returns All recipes containing the input name.
   */
  getRecipesByName(name: string) {
    const query = name.toLowerCase();
    const recipes: Recipe[] = [];
    this.recipesByName.forEach((recipe, name) => {
      if (name.includes(query)) {
        recipes.push(recipe);
      }
    });
    return recipes;
  }

  /**
   * Fetch recipes from a given ingredient search input.
   *
   * The recipe ingredients don't need to exactly match, just include the search.
   * The recipes will be returned in order of ingredient search match.
   * For example all recipes matching ingredient 1 will be first, then all recipes
   * matching ingredient 2, then all recipes matching ingredient 3.
   *
   * @param ingredient1 The first ingredient search
   * @param ingredient2 The second ingredient search
   * @param ingredient3 The third ingredient search
   * @returns All recipes containing the input ingredients
   */
  getRecipesByIngredient(
    ingredient1: string,
    ingredient2?: string | undefined,
    ingredient3?: string | undefined,
  ): Recipe[] {
    const recipesSet = new Set<Recipe>();
    const filterIngs = [ingredient1, ingredient2, ingredient3];
    for (const i of filterIngs) {
      if (!i || i === "") {
        continue;
      }
      const ingName = i.toLowerCase();
      const ingredients = this.allIngredients.filter((allIng) => allIng.name.toLowerCase().includes(ingName));
      ingredients
        .flatMap((ing) => this.recipesByIngredients.get(ing.name.toLowerCase()))
        .forEach((recipe) => (recipe ? recipesSet.add(recipe) : ""));
    }
    return Array.from(recipesSet);
  }

  /**
   * Fetch a random recipe from the database.
   *
   * @returns A single, random recipe
   */
  getRandomRecipe(): Recipe {
    const recipes = Array.from(this.recipesByName.values());
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  }

  /**
   * Store a single recipe into the database.
   *
   * @param recipe The recipe to store.
   */
  async createRecipe(recipe: Recipe) {
    console.log("saving recipe to firestore...");
    try {
      await setDoc(doc(this.firestore, "recipes", recipe.name.replaceAll(" ", "_")), recipe);
      window.alert("Your recipe has been saved");
    } catch (err) {
      console.error(err);
      window.alert("Something went wrong. Please check the console.");
    }
  }

  /**
   * Store a single ingredient into the database.
   *
   * @param ingredient The ingredient to store.
   */
  async createIngredient(ingredient: IngredientInfo) {
    console.log("saving ingredient to firestore...");
    try {
      await setDoc(doc(this.firestore, "ingredients", ingredient.name.replaceAll(" ", "_")), ingredient);
      window.alert(ingredient.name + " has been saved in the database");
    } catch (err) {
      console.error(err);
      window.alert("Something went wrong. Please check the console.");
    }
  }

  /**
   * Fetch all recipes in the database & load into the respective recipe objects.
   */
  async fetchAdminDoc() {
    const adminDoc = await getDocs(collection(this.firestore, "admin"));
    return adminDoc.docs[0];
  }

  /**
   * Save settings into firebase database
   * @param settings The definition of the settings to apply
   */
  async saveAdminSettings(settings: SettingsDefinition) {
    console.log("Saving settings...");
    try {
      await setDoc(doc(this.firestore, "admin", "admin"), settings);
      window.alert("Your settings have been saved");
    } catch (err) {
      console.error(err);
      window.alert("Something went wrong. Please check the console.");
    }
  }
}

export default FirebaseService;
