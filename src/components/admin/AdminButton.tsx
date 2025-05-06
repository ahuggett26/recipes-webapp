import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAdminAuthorized } from "../../api/AdminSlice";

/**
 * A button to navigate to the admin page.
 *
 * @returns A JSX element for the admin page button
 */
function AdminButton() {
  const navigate = useNavigate();
  const isAdminAuthorized = useSelector(selectIsAdminAuthorized);
  const adminIcon = isAdminAuthorized ? "bi-person-fill-gear" : "bi-person-fill-lock";
  return (
    <div className="position-absolute top-0 start-0 p-3">
      <button
        type="button"
        className="btn btn-primary rounded-5"
        disabled={!isAdminAuthorized}
        onClick={() => navigate("admin")}
      >
        <i className={`bi ${adminIcon} fs-3`}></i>
      </button>
    </div>
  );
}

export default AdminButton;
