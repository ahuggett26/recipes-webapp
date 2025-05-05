import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../api/Store";
import { attemptAdminAuth } from "../../api/AdminSlice";

/**
 * Login page that allows a user to attempt to sign in as an admin.
 *
 * @param props {@link Properties}
 * @returns A JSX element containing the admin login page
 */
function AdminLoginPage() {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();

  /**
   * Verifies the input password and redirects to the home page.
   */
  function verifyAndLogin() {
    const password = (document.getElementById("passwordInput") as HTMLInputElement).value;
    dispatch(attemptAdminAuth(password)).finally(() => navigate("/"));
  }

  return (
    <div className="w-75 min-h-75 mh-100">
      <h1 className="pt-2 pb-3">Admin Login:</h1>
      <div>
        <label className="justify-content-start">Enter admin code to login as an admin:</label>
        <input type="password" id="passwordInput" className="form-control" />
        <button type="button" className="btn btn-primary mt-2" onClick={verifyAndLogin}>
          Submit
        </button>
      </div>
      <div className="pt-4">
        <p>Alternatively, you can browse as a guest:</p>
        <Link to="/">Guest Login</Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;
