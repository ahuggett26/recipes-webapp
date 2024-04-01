import React, { useEffect, useState } from "react";
import Recipe from "../../model/Recipe";
import SearchDisplay from "../recipe/SearchDisplay";
import NoResultsFound from "./NoResultsFound";
import SearchInput from "./SearchInput";
import FirebaseService from "../../service/FirebaseService";

interface Props {
  /** The firebase database */
  firebase: FirebaseService;
  /** True if the database recipes have been loaded & are ready to search. */
  recipesReady: boolean;
  /** The current name being searched. */
  nameSearch: string;
  /** Search state to set. */
  setSearch: (str: string) => void;
}

/**
 * A search page for searching via name
 * 
 * @param props {@link Properties}
 * @returns A JSX component for displaying a recipe search by name
 */
function NameSearch(props: Props) {
  const [recipeResults, setRecipeResults] = useState<Recipe[]>([]);
  useEffect(() => {
    if (props.nameSearch) {
      setRecipeResults(props.firebase.getRecipesByName(props.nameSearch));
    }
  }, [props.nameSearch]);

  return (
    <>
      <SearchInput
        placeholder="Search by name..."
        width="100"
        disabled={!props.recipesReady}
        setSearch={props.setSearch}
      />
      {recipeResults.length === 0 && props.nameSearch !== "" && (
        <NoResultsFound urlQuery={props.nameSearch?.replaceAll(" ", "+")} />
      )}
      {props.nameSearch !== "" && recipeResults.map((recipe) => <SearchDisplay key={recipe.name} recipe={recipe} />)}
    </>
  );
}

export default NameSearch;
