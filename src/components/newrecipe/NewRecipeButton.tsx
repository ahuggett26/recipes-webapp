import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * A button to navigate back to new recipe page.
 *
 * @returns A JSX element for the new recipe button
 */
function NewRecipeButton() {
  const navigate = useNavigate();
  return (
    <div className="position-absolute top-0 end-0 p-3">
      <button type="button" className="btn btn-primary rounded-5" onClick={() => navigate("create-new")}>
        <i className="bi bi-plus-lg fs-3"></i>
      </button>
    </div>
  );
}

export default NewRecipeButton;
