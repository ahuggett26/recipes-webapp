import React from "react";
import "./IngredientsInput.css";
import IncrementListButton from "./IncrementListButton";

interface Properties {
  /** The array of steps. */
  steps: string[];
  /** React state function to set new steps. */
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Inputs for setting the steps of a recipe.
 * 
 * @param props {@link Properties}
 * @returns A JSX element containing steps inputs.
 */
function StepsInput(props: Properties) {
  return (
    <>
      <h3 className="pt-2">
        <IncrementListButton isDecrement onClick={() => props.setSteps((prev) => [...prev.slice(0, -1)])} />
        Steps
        <IncrementListButton onClick={() => props.setSteps((prev) => [...prev, ""])} />
      </h3>
      <ol>
        {props.steps.map((_step, index) => (
          <li className="m-1" key={"step-" + index}>
            <input id={`steps-input-` + index} className="form-control" />
          </li>
        ))}
      </ol>
    </>
  );
}

export default StepsInput;
