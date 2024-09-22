import React, { useState } from "react";
import AdminSettings from "./AdminSettings";
import PasswordPopup from "./PasswordPopup";

interface Properties {
  /** Admin settings for communication with firebase */
  adminSettings: AdminSettings;
}

/**
 * Page displaying current admin settings, and allowing modification of those settings once the password is provided.
 *
 * @param props {@link Properties}
 * @returns A JSX element of the admin page.
 */
function AdminPage(props: Properties) {
  const [isLoading, setIsLoading] = useState(true);
  const [adminCodeEnabled, setAdminCodeEnabled] = useState(false);
  const [adminCodeEntered, setAdminCodeEntered] = useState(false);
  const [passPopupVisible, setPassPopupVisible] = useState(false);

  const settingsLocked = adminCodeEnabled && !adminCodeEntered;

  props.adminSettings.isAdminCodeEnabled().then((isEnabled) => {
    console.log("admin code enabled: ", isEnabled);
    setAdminCodeEnabled(isEnabled);
    setIsLoading(false);
  });

  /**
   * Loading state while settings are being fetched from firebase
   */
  const loading = <p className="text-center">Please wait while the settings are fetched.</p>;

  /**
   * @returns JSX button to allow unlocking the settings page
   */
  function unlockButton() {
    return (
      <button type="button" className="btn btn-outline-primary mx-2" onClick={() => setPassPopupVisible(true)}>
        <i className="bi bi-unlock-fill pe-2" />
        Unlock
      </button>
    );
  }

  return (
    <div className="w-75 min-h-75 mh-100">
      <PasswordPopup
        adminSettings={props.adminSettings}
        visible={passPopupVisible}
        setVisible={setPassPopupVisible}
        onSuccess={() => setAdminCodeEntered(true)}
      />
      <h1 className="pt-2 pb-3">Admin Settings</h1>
      {isLoading ? loading : null}
      <div className={isLoading ? "invisible" : ""}>
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
          {settingsLocked ? unlockButton() : null}
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

    props.adminSettings.applySettings(password, lockNewSettings);
  }
}

export default AdminPage;
