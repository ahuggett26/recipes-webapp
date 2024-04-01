import React from "react";

interface Properties {
  onClick: () => void;
  isDecrement?: boolean;
}

function IncrementListButton(props: Properties) {
  return (
    <button className="btn btn-outline-primary mx-4" onClick={props.onClick}>
      <i className={`bi ${props.isDecrement ? "bi-node-minus-fill" : "bi-node-plus-fill"}`}></i>
    </button>
  );
}

export default IncrementListButton;
