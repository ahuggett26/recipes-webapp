import React from "react";
import { Measurement } from "./Measurement";

/** Individual ingredient information in a recipe. */
export interface Ingredient {
  /** The name of the ingredient */
  name: string;
  /** The amount of the ingredient in the recipe. */
  amount: number;
  /** The specific measurement of the ingredient. */
  measurement: Measurement;
  /** Optional qualifier. (e.g "finely chopped", "diced", "into wedges") */
  qualifier?: string;
}

/**
 * Rounds a number to the nearest 0.5.
 *
 * @param number The number to round.
 * @returns The result of rounding.
 */
const roundToHalf = (number: number) => {
  return Math.round(number * 2) / 2;
};

/**
 * Formats a measurement and amount into a string that can be displayed.
 *
 * @param ing The ingredient to format
 * @param servingMultiplier The servings multipier to apply to the ingredient amount
 * @returns The formatted measurement
 */
const formatMeasurement = (ing: Ingredient, servingMultiplier?: number) => {
  const amount = roundToHalf(ing.amount * (servingMultiplier ?? 1));
  if (ing.measurement === "units") {
    return amount + " ";
  } else if (ing.measurement === "pinch") {
    return amount + " pinch of ";
  }
  return amount + ing.measurement;
};

/**
 * Renders an ingredient in a common format.
 *
 * @param ingredient The ingredient to render
 * @param servingMultiplier The servings multiplier to apply to the ingredient
 * @returns A JSX element of the ingredient
 */
export const renderIngredient = (ingredient: Ingredient, servingMultiplier?: number) => {
  return (
    <li key={`ing-${ingredient.name}`}>
      {formatMeasurement(ingredient, servingMultiplier)} {ingredient.name}
      {ingredient.qualifier ? <i>{` (${ingredient.qualifier})`}</i> : null}
    </li>
  );
};
