import React, { useEffect, useState } from "react";
import Recipe from "../../model/Recipe";
import SearchDisplay from "../recipe/SearchDisplay";
import NoResultsFound from "./NoResultsFound";
import SearchInput from "./SearchInput";
import FirebaseService from "../../service/FirebaseService";

interface Properties {
  /** The firebase database. */
  firebase: FirebaseService;
  /** True if the database recipes have been loaded & are ready to search. */
  recipesReady: boolean;
  /** The current ingredient search state. */
  search: string;
  /** Search state to set. */
  setSearch: (ingredients: string[]) => void;
}

/**
 * A search page for searching via ingredient
 * 
 * @param props {@link Properties}
 * @returns A JSX component for displaying a recipe search by ingredient
 */
function IngredientSearch(props: Properties) {
  const [recipeResults, setRecipeResults] = useState<Recipe[]>([]);
  const ingredients = props.search === "" ? ["", "", ""] : props.search.split(",");
  const ingredient1 = ingredients[0];
  const ingredient2 = ingredients[1];
  const ingredient3 = ingredients[2];

  const emptySearch = ingredient1 === "" && ingredient2 === "" && ingredient3 === "";

  useEffect(() => {
    if (emptySearch) {
      setRecipeResults([]);
    } else {
      setRecipeResults(props.firebase.getRecipesByIngredient(ingredient1, ingredient2, ingredient3));
    }
  }, [ingredient1, ingredient2, ingredient3]);

  const urlQuery = ingredient1
    .split(" ")
    .concat(ingredient2 ? ingredient2.split(" ") : [])
    .concat(ingredient3 ? ingredient3.split(" ") : [])
    .join("+");
  return (
    <>
      <SearchInput
        width="auto"
        placeholder="Ingredient 1..."
        disabled={!props.recipesReady}
        setSearch={(ing) => setSearch([ing, ingredient2, ingredient3])}
      />
      <SearchInput
        width="auto"
        placeholder="Ingredient 2..."
        disabled={!props.recipesReady}
        setSearch={(ing) => setSearch([ingredient1, ing, ingredient3])}
      />
      <SearchInput
        width="auto"
        placeholder="Ingredient 3..."
        disabled={!props.recipesReady}
        setSearch={(ing) => setSearch([ingredient1, ingredient2, ing])}
      />
      {!emptySearch && recipeResults.length === 0 && <NoResultsFound urlQuery={urlQuery} />}
      {!emptySearch && recipeResults.map((recipe) => <SearchDisplay key={recipe.name} recipe={recipe} />)}
    </>
  );

  /**
   * Set the search state
   * 
   * @param ings Current ingredients to search with 
   * @returns void
   */
  function setSearch(ings: string[]) {
    if (ings.find((ing) => ing !== "")) {
      props.setSearch(ings);
      return;
    }
    props.setSearch([]);
  }
}

export default IngredientSearch;
