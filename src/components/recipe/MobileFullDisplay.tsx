import React from "react";
import { useSearchParams } from "react-router-dom";
import { renderIngredient } from "../../model/Ingredient";
import Recipe from "../../model/Recipe";
import "./FullDisplay.css";

interface Properties {
  /** The recipe to display. */
  recipe: Recipe;
}

/**
 * A full display for viewing a recipe on mobile.
 * 
 * @param props {@link Properties}
 * @returns A JSX component containing a recipe's full view.
 */
export default function MobileFullDisplay(props: Properties) {
  const [searchParams] = useSearchParams();
  const strServings = searchParams.get("servings");
  const servings = strServings ? Number.parseInt(strServings) : undefined;

  return (
    <>
      <h1 className="pt-5">{props.recipe.name}</h1>
      <div>Servings: {servings ?? props.recipe.servings}</div>
      <h3 className="mt-3">Ingredients:</h3>
      <ul className="px-4 centerList">
        {props.recipe.mainIngredients.map((ing) =>
          renderIngredient(ing, servings ? servings / props.recipe.servings : 1),
        )}
        {props.recipe.secondaryIngredients?.map((ing) =>
          renderIngredient(ing, servings ? servings / props.recipe.servings : 1),
        )}
      </ul>
      <h3>Steps:</h3>
      <ol className="px-3 pb-5 centerList">
        {props.recipe.steps.map((step, index) => (
          <li key={`step-${index}`} className="mb-2">
            {step}
          </li>
        ))}
      </ol>
    </>
  );
}
