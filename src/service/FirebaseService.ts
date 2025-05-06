import { initializeApp } from "firebase/app";
import Recipe from "../model/Recipe";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore/lite";
import { firebaseConfig } from "./FirebaseConfig";
import SettingsDefinition from "../components/admin/SettingsDefinition";
import IngredientInfo from "../model/IngredientInfo";

/** Firebase app instance. */
const app = initializeApp(firebaseConfig);
/** Firestore database. */
const firestore = getFirestore(app);
console.log("initialised app. stacktrace: ", new Error());

/**
 * Fetch all recipes in the database & load into the respective recipe objects.
 */
export async function fetchAllRecipes() {
  return await getDocs(collection(firestore, "recipes"));
}

/**
 * Fetch all ingrediets in the database and load them into
 */
export async function fetchAllIngredients() {
  return getDocs(collection(firestore, "ingredients"));
}

/**
 * Store a single recipe into the database.
 *
 * @param recipe The recipe to store.
 */
export async function createRecipe(recipe: Recipe) {
  console.log("saving recipe to firestore...");
  try {
    await setDoc(doc(firestore, "recipes", recipe.name.replaceAll(" ", "_")), recipe);
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
export async function createIngredient(ingredient: IngredientInfo) {
  console.log("saving ingredient to firestore...");
  try {
    await setDoc(doc(firestore, "ingredients", ingredient.name.replaceAll(" ", "_")), ingredient);
    window.alert(ingredient.name + " has been saved in the database");
  } catch (err) {
    console.error(err);
    window.alert("Something went wrong. Please check the console.");
  }
}

/**
 * Fetch all recipes in the database & load into the respective recipe objects.
 */
export async function fetchAdminDoc() {
  const adminDoc = await getDocs(collection(firestore, "admin"));
  return adminDoc.docs[0];
}

/**
 * Save settings into firebase database
 * @param settings The definition of the settings to apply
 */
export async function storeAdminSettings(settings: SettingsDefinition) {
  console.log("Saving settings...");
  try {
    await setDoc(doc(firestore, "admin", "admin"), settings);
    window.alert("Your settings have been saved");
  } catch (err) {
    console.error(err);
    window.alert("Something went wrong. Please check the console.");
  }
}
