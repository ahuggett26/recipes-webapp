import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * A button to navigate to the admin page.
 *
 * @returns A JSX element for the admin page button
 */
function AdminButton() {
  const navigate = useNavigate();
  return (
    <div className="position-absolute top-0 start-0 p-3">
      <button type="button" className="btn btn-primary rounded-5" onClick={() => navigate("admin")}>
        <i className="bi bi-person-fill-gear fs-3"></i>
      </button>
    </div>
  );
}

export default AdminButton;
