import React from "react";

/** An accepted ingredient measurement. */
export type Measurement = "g" | "ml" | "l" | "units" | "tsp" | "tbsp" | "pinch";

/** Individual ingredient information in a recipe. */
export interface Ingredient {
  /** The name of the ingredient */
  name: string;
  /** The amount of the ingredient in the recipe. */
  amount: number;
  /** The specific measurement of the ingredient. */
  measurement: Measurement;
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
 * Extract the preparation from the ingredient name.
 * 
 * Preparation instructions will be in brackets at the end of the ingredient name.
 * This will return the ingredient name first, then the preparation instruction,
 * if available.
 * 
 * @param ing The ingredient to extract preparation from
 * @returns The ingredient name and preparation, seperated in a pair.
 */
const extractPrepFromIngredient = (ing: Ingredient): [string, string | undefined] => {
  if (!ing.name.includes("(") && !ing.name.includes(")")) {
    return [ing.name, undefined];
  }
  return [ing.name.substring(0, ing.name.indexOf("(")), ing.name.substring(ing.name.indexOf("("), ing.name.length)];
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
 * @param ing The ingredient to render
 * @param servingMultiplier The servings multiplier to apply to the ingredient
 * @returns A JSX element of the ingredient
 */
export const renderIngredient = (ing: Ingredient, servingMultiplier?: number) => {
  const [ingredient, preparation] = extractPrepFromIngredient(ing);
  return (
    <li key={`ing-${ing.name}`}>
      {formatMeasurement(ing, servingMultiplier)} {ingredient}
      <i>{preparation}</i>
    </li>
  );
};
