import React, { useState } from "react";
import "./IngredientsInput.css";
import IncrementListButton from "./IncrementListButton";

interface Properties {
  /** A number array of ingredients indexes. */
  ingredients: number[];
  /** React state function to set new ingredients. */
  setIngredients: React.Dispatch<React.SetStateAction<number[]>>;
}

/**
 * Inputs for setting ingredient information, e.g. amount, measurement and name.
 * 
 * @param props {@link Properties}
 * @returns A JSX element containing ingredient inputs.
 */
function IngredientsInput(props: Properties) {
  return (
    <>
      <h3 className="pt-4">
        <IncrementListButton isDecrement onClick={() => props.setIngredients((prev) => [...prev.slice(0, -1)])} />
        Ingredients
        <IncrementListButton onClick={() => props.setIngredients((prev) => [...prev, prev.length])} />
      </h3>
      <ul>
        {props.ingredients.map((_ingredient, index) => (
          <li className="m-1" key={"ingredient-" + index}>
            <IngredientInput index={index} />
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Inputs for setting information for a single ingredient.
 * 
 * @param props 
 * @returns A JSX element containing a single ingredient input
 */
function IngredientInput(props: { index: number }) {
  const [mainIng, setMainIng] = useState(false);

  const createId = (name: string) => `ingredient-${name}-${props.index}`;

  return (
    <span className="d-flex gap-1">
      <datalist id="valid-measurements">
        <option value="g"></option>
        <option value="ml"></option>
        <option value="l"></option>
        <option value="tsp"></option>
        <option value="tbsp"></option>
        <option value="pinch"></option>
        <option value="units"></option>
      </datalist>
      <input id={createId("name")} className="form-control d-inline-block" />
      <input id={createId("amount")} className="form-control d-inline-block flex-grow-0 amountInput" type="number" />
      <input
        id={createId("measurement")}
        className="form-control d-inline-block flex-grow-0 measurementInput"
        type="text"
        list="valid-measurements"
      />
      <input id={createId("required")} className="btn-check" type="checkbox" />
      <label
        className="btn btn-outline-primary ms-5 mainIngInput"
        htmlFor={createId("required")}
        onClick={() => setMainIng((prev) => !prev)}
      >
        <i>{mainIng ? "Main" : "Secondary"}</i>
      </label>
    </span>
  );
}

export default IngredientsInput;
