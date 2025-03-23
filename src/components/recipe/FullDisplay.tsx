import React from "react";
import { useSearchParams } from "react-router-dom";
import Recipe from "../../model/Recipe";
import { useSelector } from "react-redux";
import { RecipeState, selectRecipeByName, selectRecipeReadiness } from "../../api/RecipeSlice";

interface Properties {
  /** The child implementation for rendering the recipe.  */
  child: (recipe: Recipe) => React.ReactNode;
}

/**
 * A base component for viewing a single recipe in full view.
 *
 * This function will fetch the recipe first, and pass that to any child
 * view for rendering the recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX component for fetching a recipe for full display.
 */
export default function FullDisplay(props: Properties) {
  const [searchParams] = useSearchParams();
  const recipeName = searchParams.get("recipe")?.replaceAll("_", " ");
  const recipeReadiness = useSelector(selectRecipeReadiness);
  const recipe = useSelector((state: RecipeState) => selectRecipeByName(state, recipeName ?? ""));

  if (recipeReadiness === "pending") {
    return <div>Loading recipe: {recipeName}...</div>;
  }
  if (recipeReadiness === "error" || !recipe) {
    return <div>Something went wrong. Recipe {`"${recipeName}"`} was not found.</div>;
  }
  return <div className="w-75 min-h-75 mh-100">{props.child(recipe)}</div>;
}
