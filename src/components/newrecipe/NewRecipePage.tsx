import React, { useState } from "react";
import IngredientsInput from "./IngredientsInput";
import InformationalInput from "./InformationalInput";
import Recipe from "../../model/Recipe";
import { Ingredient, Measurement } from "../../model/Ingredient";
import StepsInput from "./StepsInput";
import FirebaseService from "../../service/FirebaseService";
import PasswordPopup from "../admin/PasswordPopup";
import AdminSettings from "../admin/AdminSettings";

interface Properties {
  /** The firebase service containing recipe data. */
  firebase: FirebaseService;
  /** Admin settings for communication with firebase */
  adminSettings: AdminSettings;
}

/**
 * A page for creating a new recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the new recipe page.
 */
function NewRecipePage(props: Properties) {
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([0]);
  const [imgUrl, setImgUrl] = useState("");
  const [passPopupVisible, setPassPopupVisible] = useState(false);
  return (
    <div className="w-75 min-h-75 mh-100">
      <PasswordPopup
        adminSettings={props.adminSettings}
        visible={passPopupVisible}
        setVisible={setPassPopupVisible}
        onSuccess={() => submitNewRecipe()}
      />
      <h1 className="pt-2">Create New Recipe</h1>
      <input id="titleInput" className="form-control m-1" placeholder="Title" />
      <textarea id="descInput" className="form-control m-1" placeholder="Description" rows={1} />
      <div className="d-flex justify-content-evenly align-items-center">
        <input type="url" id="recipeUrlInput" className="form-control m-1 w-auto" placeholder="Recipe URL" />
        <input
          type="url"
          id="imageInput"
          className="form-control m-1 w-auto"
          placeholder="Image URL"
          onChange={(event) => setImgUrl(event.target.value)}
        />
        <img className="object-fit-cover" src={imgUrl} width={100} height={100} />
      </div>
      <InformationalInput />
      <IngredientsInput ingredients={ingredients} setIngredients={setIngredients} />
      <StepsInput steps={steps} setSteps={setSteps} />
      <button className="btn btn-primary d-block text-center mx-auto mt-2" onClick={() => onSubmit()}>
        Submit
      </button>
    </div>
  );

  /**
   * Function to run when submitting a recipe.
   *
   * If adding a recipe is locked behind an admin code, opens the password popup.
   * Otherwise, the recipe will be submitted immediately.
   */
  async function onSubmit() {
    const adminCodeEnabled = await props.adminSettings.isAdminCodeEnabled();
    const newRecipesLocked = await props.adminSettings.isNewRecipesLocked();
    if (adminCodeEnabled && newRecipesLocked) {
      setPassPopupVisible(true);
    } else {
      submitNewRecipe();
    }
  }

  /**
   * Submit a new recipe from the inputs into the firebase database.
   */
  function submitNewRecipe() {
    const title = (document.getElementById("titleInput") as HTMLInputElement).value;
    const description = (document.getElementById("descInput") as HTMLTextAreaElement).value;
    const prepTime = (document.getElementById("prepTimeInput") as HTMLInputElement).value;
    const cookTime = (document.getElementById("cookTimeInput") as HTMLInputElement).value;
    const servings = (document.getElementById("servingsInput") as HTMLInputElement).value;
    const recipeUrl = (document.getElementById("recipeUrlInput") as HTMLInputElement).value;
    const mainIngredients = getIngredients(true);
    const secondaryIngredients = getIngredients(false);

    const output: Recipe = {
      name: title,
      description,
      imgSrc: imgUrl,
      link: recipeUrl,
      prepTimeMins: parseTimeMins(prepTime),
      cookTimeMins: parseTimeMins(cookTime),
      servings: Number.parseInt(servings),
      mainIngredients,
      secondaryIngredients,
      steps: steps.map((_, index) => (document.getElementById("steps-input-" + index) as HTMLInputElement).value),
    };
    props.firebase.createRecipe(output);
  }

  /**
   * Parse a time-input into a numerical input for firebase
   *
   * @param time Time string value as returned by a time input.
   * @returns A number of minutes representing the number input.
   */
  function parseTimeMins(time: string): number {
    const split = time.split(":");
    const hrs = split[0];
    const mins = split[1];
    return Number.parseInt(hrs) * 60 + Number.parseInt(mins);
  }

  /**
   * Fetch the ingredients from the input values, and parse them into
   * {@link Ingredient} objects, for storage.
   *
   * @param required Whether the ingredient is a required, 'main' ingredient
   * @returns A list of ingredients to store for the recipe.
   */
  function getIngredients(required: boolean): Ingredient[] {
    return ingredients
      .filter(
        (_, index) =>
          (document.getElementById("ingredient-required-" + index) as HTMLInputElement).checked === required,
      )
      .map((_, index) => {
        const name = (document.getElementById("ingredient-name-" + index) as HTMLInputElement).value;
        const amount = (document.getElementById("ingredient-amount-" + index) as HTMLInputElement).value;
        const measurement = (document.getElementById("ingredient-measurement-" + index) as HTMLInputElement).value;
        return {
          name,
          amount: Number(amount),
          measurement: measurement as Measurement,
        };
      });
  }
}

export default NewRecipePage;
