import React, { useState } from "react";
import IngredientsInput from "./IngredientsInput";
import InformationalInput from "./InformationalInput";
import Recipe from "../../model/Recipe";
import { Ingredient } from "../../model/Ingredient";
import StepsInput from "./StepsInput";
import FirebaseService from "../../service/FirebaseService";
import PasswordPopup from "../admin/PasswordPopup";
import AdminSettings from "../admin/AdminSettings";
import { getFieldFloat, getFieldInt, getFieldMeasurement, getFieldString, isChecked } from "../../utils/FormUtils";

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
      <div className="d-flex justify-content-evenly align-items-center">
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
    const mainIngredients = getIngredients(true);
    const secondaryIngredients = getIngredients(false);

    const output: Recipe = {
      name: getFieldString("titleInput"),
      imgSrc: imgUrl,
      prepTimeMins: parseTimeMins(getFieldString("prepTimeInput")),
      cookTimeMins: parseTimeMins(getFieldString("cookTimeInput")),
      servings: getFieldInt("servingsInput"),
      mainIngredients,
      secondaryIngredients,
      steps: steps.map((_, index) => getFieldString("steps-input-" + index)),
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
      .filter((_, index) => isChecked("ingredient-required-" + index) === required)
      .map((_, index) => {
        const qualifier = getFieldString("ingredient-qualifier-" + index);
        return {
          name: getFieldString("ingredient-name-" + index),
          amount: getFieldFloat("ingredient-amount-" + index),
          measurement: getFieldMeasurement("ingredient-measurement-" + index),
          qualifier: qualifier === "" ? undefined : qualifier,
        };
      });
  }
}

export default NewRecipePage;
