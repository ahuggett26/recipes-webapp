import React, { useState } from "react";
import FirebaseService from "../../service/FirebaseService";
import IngredientInfo from "../../model/IngredientInfo";
import SearchInput from "../search/SearchInput";
import { Link } from "react-router-dom";

interface Properties {
  /** The firebase service containing recipe & ingredient data. */
  firebase: FirebaseService;
}

/**
 * A page for creating a new recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the new recipe page.
 */
function IngredientList(props: Properties) {
  const [nameFilter, setNameFilter] = useState("");
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
        {mockGetIngredientList()
          .filter((ingredient) => ingredient.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
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

function mockGetIngredientList(): IngredientInfo[] {
  return [
    {
      name: "Cauliflower",
      dietary: {
        vegan: true,
        vegetarian: true,
        pescetarian: true,
      },
      nutrition: {
        kcal: 34,
        fat: 0.5,
        fibre: 1.8,
        protein: 2.5,
        sat_fat: 0.2,
      },
      reference: {
        amount: 100,
        measurement: "g",
      },
    },
    {
      name: "Green pesto",
      dietary: {
        vegan: false,
        vegetarian: true,
        pescetarian: true,
      },
      nutrition: {
        kcal: 312,
        fat: 28.4,
        fibre: 3,
        protein: 4.3,
        sat_fat: 4,
      },
      reference: {
        amount: 100,
        measurement: "g",
      },
    },
    {
      name: "Chicken stock",
      dietary: {
        vegan: false,
        vegetarian: false,
        pescetarian: false,
      },
      nutrition: {
        kcal: 8,
        fat: 0.5,
        fibre: 0.5,
        protein: 1.4,
        sat_fat: 0.1,
      },
      reference: {
        amount: 100,
        measurement: "ml",
      },
    },
  ];
}

export default IngredientList;
