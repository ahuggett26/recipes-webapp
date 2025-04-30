import React, { useState } from "react";
import SearchInput from "../search/SearchInput";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../api/IngredientSlice";

/**
 * A page for creating a new recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the new recipe page.
 */
function IngredientList() {
  const [nameFilter, setNameFilter] = useState("");
  const allIngredients = useSelector(selectIngredients);

  return (
    <div className="w-75 min-h-75 mh-100">
      <h1 className="py-2">All Ingredients</h1>
      <SearchInput disabled={false} placeholder="Find ingredient" width="100" setSearch={setNameFilter} />
      <Link to="../create-ingredient">Add new ingredient</Link>
      <div className="container pt-4">
        <div className="row">
          <span className="col">
            <b>Ingredient</b>
          </span>
          <span className="col-1">
            <b>Per</b>
          </span>
          <span className="col-1">
            <b>Calories</b>
          </span>
          <span className="col-1">
            <b>Protein</b>
          </span>
          <span className="col-1">
            <b>Fibre</b>
          </span>
          <span className="col-1">
            <b>Fat</b>
          </span>
          <span className="col-1">
            <b>Sat. Fat</b>
          </span>
          <span className="col">
            <b>Dietary</b>
          </span>
        </div>
        {allIngredients
          .filter((ingredient) => ingredient.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .map((ingredient) => (
            <div className="row" key={ingredient.name}>
              <span className="col">{ingredient.name}</span>
              <span className="col-1">
                {ingredient.reference.amount}
                {ingredient.reference.measurement}
              </span>
              <span className="col-1">{ingredient.nutrition.kcal} kcal</span>
              <span className="col-1">{ingredient.nutrition.protein}g</span>
              <span className="col-1">{ingredient.nutrition.fibre}g</span>
              <span className="col-1">{ingredient.nutrition.fat}g</span>
              <span className="col-1">{ingredient.nutrition.sat_fat}g</span>
              <span className="col">
                {ingredient.dietary.vegan ? "🍎" : null}
                {ingredient.dietary.vegetarian ? "🍯" : null}
                {ingredient.dietary.pescetarian ? "🐟" : null}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default IngredientList;
