import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../model/Recipe";
import { renderIngredient } from "../../model/Ingredient";
import "./SearchDisplay.css";

interface Properties {
  /** The recipe to display */
  recipe: Recipe;
}

/**
 * A condensed display for a recipe, in a search view.
 *
 * @param props
 * @returns A JSX component containing a recipe's in a condensed, search view.
 */
export default function SearchDisplay(props: Properties) {
  return (
    <Link
      className="border rounded-3 mb-2 d-flex text-decoration-none text-black"
      to={"/desktop-view?recipe=" + props.recipe.name.replaceAll(" ", "_")}
    >
      {props.recipe.imgSrc ? (
        <img
          className="thumbnail p-2 object-fit-cover align-self-center"
          src={props.recipe.imgSrc}
          width={120}
          height={120}
        />
      ) : null}
      <div className="p-2 flex-grow-1">
        <h3>{props.recipe.name}</h3>
        <div>
          <ul className="text-start d-flex flex-wrap column-gap-5">
            {props.recipe.mainIngredients.map((ing) => renderIngredient(ing))}
          </ul>
        </div>
      </div>
      <div className="timings align-self-center mx-1 flex-shrink-0">
        <p className="mb-0 mt-1">Prep time:</p>
        <p>{props.recipe.prepTimeMins} mins</p>
        <p className="m-0">Cook time:</p>
        <p className="mb-1">{props.recipe.cookTimeMins} mins</p>
      </div>
    </Link>
  );
}
