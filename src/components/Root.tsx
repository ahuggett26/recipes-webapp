import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchRecipes } from "../api/RecipeSlice";
import { fetchIngredients } from "../api/IngredientSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../api/Store";

/**
 * The root page, within which all other pages are contained.
 *
 * Contains consistent stylings.
 * Other component are rendered inside via the  react router {@link Outlet}.
 *
 * @returns A JSX component of the root page.
 */
function Root() {
  const dispatch = useDispatch() as AppDispatch;
  useEffect(() => {
    // Fetch the initial data from DB to load into state on first render
    dispatch(fetchRecipes());
    dispatch(fetchIngredients());
  });

  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center text-center">
      <Outlet />
    </div>
  );
}

export default Root;
