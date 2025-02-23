import React from "react";

/** An accepted ingredient measurement. */
export type Measurement = "g" | "ml" | "l" | "units" | "tsp" | "tbsp" | "pinch";

export function measurementDatalist() {
  return (
    <datalist id="valid-measurements">
      <option value="g"></option>
      <option value="ml"></option>
      <option value="l"></option>
      <option value="tsp"></option>
      <option value="tbsp"></option>
      <option value="pinch"></option>
      <option value="units"></option>
    </datalist>
  );
}
