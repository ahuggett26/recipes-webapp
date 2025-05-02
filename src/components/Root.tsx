import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchRecipes } from "../api/RecipeSlice";
import { fetchIngredients } from "../api/IngredientSlice";
import { useDispatch, useSelector } from "react-redux";
import { IngredientDispatch, RecipeDispatch } from "../api/Store";
import { selectFirebaseService } from "../api/FirebaseSlice";

/**
 * The root page, within which all other pages are contained.
 *
 * Contains consistent stylings.
 * Other component are rendered inside via the  react router {@link Outlet}.
 *
 * @returns A JSX component of the root page.
 */
function Root() {
  const firebaseService = useSelector(selectFirebaseService);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch the initial data from DB to load into state on first render
    console.log("Fetching recipes from Root");
    (dispatch as RecipeDispatch)(fetchRecipes(firebaseService));
    (dispatch as IngredientDispatch)(fetchIngredients(firebaseService));
  });

  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center text-center">
      <Outlet />
    </div>
  );
}

export default Root;
