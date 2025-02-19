import React from "react";
import "./CookTimeInput.css";

/**
 * Small inputs for informational elements, e.g. cook time & servings.
 *
 * @returns A JSX element containing informational inputs.
 */
function InformationalInput() {
  return (
    <>
      <datalist id="valid-times">
        <option value="00:15"></option>
        <option value="00:30"></option>
        <option value="00:45"></option>
        <option value="01:00"></option>
        <option value="01:15"></option>
        <option value="01:30"></option>
        <option value="01:45"></option>
        <option value="02:00"></option>
        <option value="02:30"></option>
        <option value="03:00"></option>
      </datalist>
      <table className="m-auto">
        <tr>
          <th>Prep Time</th>
          <th>Cook Time</th>
          <th>Servings</th>
        </tr>
        <tr>
          <td className="px-2">
            <input id="prepTimeInput" type="time" className="form-control" list="valid-times" />
          </td>
          <td className="px-2">
            <input id="cookTimeInput" type="time" className="form-control" list="valid-times" />
          </td>
          <td className="px-2">
            <input id="servingsInput" type="number" className="form-control numericalInput" />
          </td>
        </tr>
      </table>
    </>
  );
}

export default InformationalInput;
