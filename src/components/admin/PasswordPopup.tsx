import React, { useState } from "react";
import AdminSettings from "./AdminSettings";

interface Properties {
  /** Admin settings for verifying the password with firebase config */
  adminSettings: AdminSettings;
  /** true if the password popup should be visible */
  visible: boolean;
  /** Function to set {@link Properties.visible} */
  setVisible: (b: boolean) => void;
  /** Function to run on password entry success */
  onSuccess: () => void;
}

/**
 * Popup requiring password input that matches the admin password
 *
 * This popup should always be in the html where it should be displayed when visible.
 * Set visibility through {@link Properties.visible}
 *
 * TODO: convert this into a full admin entry page
 *
 * @param props {@link Properties}
 * @returns A JSX element containing the password popup modal
 */
const PasswordPopup = (props: Properties) => {
  const [incorrectPass, setIncorrectPass] = useState(false);

  /**
   * Verifies if the input password is correct.
   * If it is, {@link Properties.onSuccess} will run and the popup will disappear.
   * If not, the popup will remain, with text explaining that the password is wrong.
   */
  function verifyPassword() {
    const password = (document.getElementById("passwordInput") as HTMLInputElement).value;
    // (dispatch as AdminDispatch)(attemptAdminAuthentication(props.firebaseService))
    // props.adminSettings.isAdminCodeCorrect(password).then((isCorrect) => {
    //   if (isCorrect) {
    //     props.setVisible(false);
    //     props.onSuccess();
    //   } else {
    //     setIncorrectPass(true);
    //   }
    // });
  }

  return (
    <div className="modal" aria-hidden="true" style={{ display: props.visible ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <label className="justify-content-start">Enter password:</label>
            <input
              type="password"
              id="passwordInput"
              className="form-control"
              onChange={() => setIncorrectPass(false)}
            />
          </div>
          <p className={incorrectPass ? "" : "invisible"}>Password entered is incorrect. Please try again.</p>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => props.setVisible(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={verifyPassword} disabled={incorrectPass}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPopup;
