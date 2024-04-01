import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Button to allow you to return the home page.
 * 
 * @returns A JSX component for the home button.
 */
function HomeButton() {
  const navigate = useNavigate();
  return (
    <div className="fixed-top p-3 text-end">
      <button type="button" className="btn btn-primary rounded-5" onClick={() => navigate("/")}>
        <i className="bi bi-house-door-fill fs-3"></i>
      </button>
    </div>
  );
}

export default HomeButton;
