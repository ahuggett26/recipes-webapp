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

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  /**
   * Fetch all recipes in the database & load into the respective recipe objects.
   */
  async fetchAllRecipes() {
    return await getDocs(collection(this.firestore, "recipes"));
  }

  /**
   * Fetch all ingrediets in the database and load them into
   */
  async fetchAllIngredients() {
    return getDocs(collection(this.firestore, "ingredients"));
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
