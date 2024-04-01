import React from "react";

interface Properties {
  /** True if the input box should be disabled. False if the user can type into it. */
  disabled: boolean;
  /** The placeholder to display in the search input box. */
  placeholder: string;
  /** The width of the input box. Either 100% or auto width. */
  width: "auto" | "100";
  setSearch: (search: string) => void;
}

/**
 * A common search input box.
 * 
 * @param props {@link Properties}
 * @returns A JSX component of a search input box.
 */
function SearchInput(props: Properties) {
  return (
    <div className={`input-group flex-nowrap p-2 d-inline-flex w-${props.width}`}>
      <span className="input-group-text" id="addon-wrapping">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={(event) => {
          props.setSearch(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchInput;
