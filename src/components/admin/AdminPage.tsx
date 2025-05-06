import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAdminSettings, selectIsAdminAuthorized } from "../../api/AdminSlice";
import { AppDispatch } from "../../api/Store";

/**
 * Page displaying current admin settings, and allowing modification of those settings once the password is provided.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the admin page.
 */
function AdminPage() {
  const dispatch = useDispatch as AppDispatch;
  const isAdminAuthorised = useSelector(selectIsAdminAuthorized);
  const settingsLocked = !isAdminAuthorised;

  return (
    <div className="w-75 min-h-75 mh-100">
      <h1 className="pt-2 pb-3">Admin Settings</h1>
      <div>
        <div className="form-check form-switch form-check-reverse d-flex justify-content-center pt-3">
          <label className="form-check-label pe-3">Require password for new recipes</label>
          <input
            id="lockNewRecipesInput"
            className="form-check-input"
            type="checkbox"
            role="switch"
            disabled={settingsLocked}
          />
        </div>
        <div className="py-3">
          <label className="form-check-label pe-3">Password lock: </label>
          <input
            id="codeInput"
            type="password"
            className="form-control d-inline-block w-50"
            disabled={settingsLocked}
          />
        </div>
        <div className="pt-3">
          <button
            className="btn btn-primary d-inline-block text-center mx-2"
            disabled={settingsLocked}
            onClick={() => submitSettings()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Save settings into the firebase database.
   */
  function submitSettings() {
    const password = (document.getElementById("codeInput") as HTMLInputElement).value;
    const lockNewSettings = (document.getElementById("lockNewRecipesInput") as HTMLInputElement).checked;

    dispatch(saveAdminSettings(password, lockNewSettings));
  }
}

export default AdminPage;
