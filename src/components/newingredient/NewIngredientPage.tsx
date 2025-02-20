import React, { useState } from "react";
import FirebaseService from "../../service/FirebaseService";
import AdminSettings from "../admin/AdminSettings";
import PasswordPopup from "../admin/PasswordPopup";
import { measurementDatalist } from "../../model/Measurement";

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
      <div className="container ">
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
    </div>
  );
}

export default NewIngredientPage;
