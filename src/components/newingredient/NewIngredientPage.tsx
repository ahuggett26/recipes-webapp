import React, { useState } from "react";
import FirebaseService from "../../service/FirebaseService";
import AdminSettings from "../admin/AdminSettings";
import PasswordPopup from "../admin/PasswordPopup";

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
      <input id="titleInput" className="form-control m-1" placeholder="Name" />
      <div className="d-inline-block">
        <div className="d-inline-block">
          <label htmlFor="kcalInput">Calories (kcal)</label>
          <input id="kcalInput" className="form-control m-1" type="number" />
        </div>
        <div className="d-inline-block">
          <label htmlFor="proteinInput">Protein (g)</label>
          <input id="proteinInput" className="form-control m-1" type="number" />
        </div>
        <div className="d-inline-block">
          <label htmlFor="fatInput">Fat (g)</label>
          <input id="fatInput" className="form-control m-1" type="number" />
        </div>
        <div className="d-inline-block">
          <label htmlFor="satfatInput">Saturated fat (g)</label>
          <input id="satfatInput" className="form-control m-1" type="number" />
        </div>
        <div className="d-inline-block">
          <label htmlFor="fibreInput">Fibre (g)</label>
          <input id="fibreInput" className="form-control m-1" type="number" />
        </div>
      </div>
    </div>
  );
}

export default NewIngredientPage;
