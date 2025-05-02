import React from "react";
import { measurementDatalist } from "../../model/Measurement";
import IngredientInfo from "../../model/IngredientInfo";
import {
  clearAllFields,
  getFieldFloat,
  getFieldInt,
  getFieldMeasurement,
  getFieldString,
  isChecked,
} from "../../utils/FormUtils";
import { Link } from "react-router-dom";
import { addIngredient } from "../../api/IngredientSlice";
import { useSelector } from "react-redux";
import { selectIsAdminAuthorized } from "../../api/AdminSlice";
import { selectFirebaseService } from "../../api/FirebaseSlice";

/**
 * A page for creating a new recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the new recipe page.
 */
function NewIngredientPage() {
  const firebase = useSelector(selectFirebaseService);
  const isAuthenticated = useSelector(selectIsAdminAuthorized);
  return (
    <div className="w-75 min-h-75 mh-100">
      <h1 className="pt-2">Add New Ingredient</h1>
      <Link to="../ingredient-list">See all current ingredients</Link>
      <input id="titleInput" className="form-control m-4" placeholder="Name" />
      <div className="row my-3 align-items-center">
        {measurementDatalist()}
        <span className="col-5 text-end">Reference:</span>
        <input id="refAmount" className="form-control text-center col" type="number" defaultValue={100} />
        <input
          id="refMeasurement"
          className="form-control text-center col"
          type="text"
          defaultValue="g"
          list="valid-measurements"
        />
        <span className="col-4" />
      </div>
      <div className="container">
        <div className="row my-1 align-items-center">
          <span className="col-5 text-end">Calories: </span>
          <input id="kcalInput" className="form-control col text-center" type="number" placeholder="0" />
          <span className="col-5 text-start">kcal</span>
        </div>
        <div className="row my-1 align-items-center">
          <span className="col-5 text-end">Protein: </span>
          <input id="proteinInput" className="form-control col text-center" type="number" placeholder="0.0" />
          <span className="col-5 text-start">g</span>
        </div>
        <div className="row my-1 align-items-center">
          <span className="col-5 text-end">Fat: </span>
          <input id="fatInput" className="form-control col text-center" type="number" placeholder="0.0" />
          <span className="col-5 text-start">g</span>
        </div>
        <div className="row my-1 align-items-center">
          <span className="col-5 text-end">Saturated fat: </span>
          <input id="satfatInput" className="form-control col text-center" type="number" placeholder="0.0" />
          <span className="col-5 text-start">g</span>
        </div>
        <div className="row my-1 align-items-center">
          <span className="col-5 text-end">Fibre: </span>
          <input id="fibreInput" className="form-control col text-center" type="number" placeholder="0.0" />
          <span className="col-5 text-start">g</span>
        </div>
      </div>
      <div className="pt-4 pb-2">
        <label htmlFor="veganCheckInput">Is Vegan</label>
        <input id="veganCheckInput" className="form-check-input mx-3" type="checkbox" />
      </div>
      <div className="py-2">
        <label htmlFor="vegetarianCheckInput">Is Vegetarian</label>
        <input id="vegetarianCheckInput" className="form-check-input mx-3" type="checkbox" />
      </div>
      <div className="py-2">
        <label htmlFor="pescetarianCheckInput">Is Pescetarian</label>
        <input id="pescetarianCheckInput" className="form-check-input mx-3" type="checkbox" />
      </div>
      <button
        className="btn btn-primary d-block text-center mx-auto mt-2"
        disabled={!isAuthenticated}
        onClick={() => onSubmit(isAuthenticated)}
      >
        Submit
      </button>
      <button className="btn btn-outline-primary d-block text-center mx-auto mt-3" onClick={() => clearAllFields()}>
        Clear
      </button>
    </div>
  );

  async function onSubmit(isAuthenticated: boolean) {
    if (isAuthenticated) {
      submitNewIngredient();
    } else {
      alert("Sorry, you cannot submit an ingredient as you do not have admin access.");
    }
  }

  /**
   * Submit a new recipe from the inputs into the firebase database.
   */
  function submitNewIngredient() {
    const output: IngredientInfo = {
      name: getFieldString("titleInput"),
      dietary: {
        vegan: isChecked("veganCheckInput"),
        vegetarian: isChecked("vegetarianCheckInput"),
        pescetarian: isChecked("pescetarianCheckInput"),
      },
      nutrition: {
        kcal: getFieldInt("kcalInput"),
        protein: getFieldFloat("proteinInput"),
        fat: getFieldFloat("fatInput"),
        sat_fat: getFieldFloat("satfatInput"),
        fibre: getFieldFloat("fibreInput"),
      },
      reference: {
        amount: getFieldInt("refAmount"),
        measurement: getFieldMeasurement("refMeasurement"),
      },
    };
    firebase.createIngredient(output);
    addIngredient(output);
  }
}

export default NewIngredientPage;
