import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Recipe from "../../model/Recipe";
import FirebaseService from "../../service/FirebaseService";

interface Properties {
  /** The firebase database. */
  firebase: FirebaseService;
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

  const [recipe, setRecipe] = useState<Recipe | "pending" | null>("pending");

  useEffect(() => {
    if (recipeName) {
      getRecipeFromService(recipeName);
    } else {
      setRecipe(null);
    }
  }, [searchParams]);

  /**
   * Fetch the recipe from firebase & load it into react state.
   * 
   * @param recipeName The name of the recipe to fetch.
   * @returns void
   */
  async function getRecipeFromService(recipeName: string) {
    await props.firebase.waitUntilRecipesLoaded();
    const matches = props.firebase.getRecipesByName(recipeName);
    if (matches.length !== 1) {
      console.log("Invalid amount of recipe matches found:", matches);
      setRecipe(null);
      return;
    }
    setRecipe(matches[0]);
  }

  if (recipe === "pending") {
    return <div>Loading recipe: {recipeName}...</div>;
  }
  if (!recipe) {
    return <div>Something went wrong. Recipe {`"${recipeName}"`} was not found.</div>;
  }
  return <div className="w-75 min-h-75 mh-100">{props.child(recipe)}</div>;
}
