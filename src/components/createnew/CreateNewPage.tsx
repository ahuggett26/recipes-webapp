import React from "react";
import { useSelector } from "react-redux";
import { selectIsAdminAuthorized } from "../../api/AdminSlice";
import { useNavigate } from "react-router-dom";

/**
 * A hub for creating new objects & adding to database.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the create new page.
 */
function CreateNewPage() {
  const isAuthenticated = useSelector(selectIsAdminAuthorized);
  const navigate = useNavigate();
  return (
    <div className="w-75 min-h-75 mh-100">
      <h1>Create new</h1>
      <p>This is the hub for creating new objects to add to your database.</p>
      {!isAuthenticated && (
        <p className="d-inline-block border border-warning rounded-4 py-2 px-4">
          <p className="m-0">⚠️</p>
          <i>Warning! You do not have admin access, so you will be unable to submit any form.</i>
        </p>
      )}
      <h3 className="pt-2">New Ingredient</h3>
      <p>
        Ingredients are the building blocks of a recipe. <br />
        By adding an ingredient to the database, it can be referenced in recipes. <br />
        This can make it easier to create recipes, and help the app calculate the nutritional content of your recipes.{" "}
        <br />
      </p>
      <button type="button" className="btn btn-primary rounded-3" onClick={() => navigate("/create-ingredient")}>
        Create Ingredient 🧅
      </button>
      <h3 className="pt-4">New Recipe</h3>
      <p>
        Recipes are the heart of the food you want to make. <br />
        A recipe should have a unique name, a list of ingredients and a list of steps needed to make it. <br />
      </p>
      <button type="button" className="btn btn-primary rounded-3" onClick={() => navigate("/create-recipe")}>
        Create Recipe 🍲
      </button>
    </div>
  );
}

export default CreateNewPage;
