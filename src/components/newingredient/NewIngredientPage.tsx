import React, { useState } from "react";
import FirebaseService from "../../service/FirebaseService";
import AdminSettings from "../admin/AdminSettings";
import PasswordPopup from "../admin/PasswordPopup";
import { measurementDatalist } from "../../model/Measurement";
import IngredientInfo from "../../model/IngredientInfo";
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
function NewIngredientPage(props: Properties) {
  const [passPopupVisible, setPassPopupVisible] = useState(false);
  return (
    <div className="w-75 min-h-75 mh-100">
      <PasswordPopup
        adminSettings={props.adminSettings}
        visible={passPopupVisible}
        setVisible={setPassPopupVisible}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSuccess={() => {}}
      />
      <h1 className="pt-2">Add New Ingredient</h1>
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
      <button className="btn btn-primary d-block text-center mx-auto mt-2" onClick={() => onSubmit()}>
        Submit
      </button>
    </div>
  );

  async function onSubmit() {
    // TODO: password protect this
    submitNewIngredient();
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
    props.firebase.createIngredient(output);
  }
}

export default NewIngredientPage;
