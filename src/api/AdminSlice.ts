import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sha256 } from "js-sha256";
import { AppState, AppThunk } from "./Store";

// Define the TS type for the admin slice's state
export interface AdminState {
  // True if an admin code has been enabled by the user. Null indicates an error in fetching.
  adminCodeEnabled: boolean | null;
  // True if a correct admin code has been entered by the user.
  // This means the user will be able to access admin-only functions, such as submitting recipes.
  // TODO: a more secure method should be used here instead - try JWT/authenticating the database
  isAdminAuthorized: boolean;
}

/** Selector to determine whether or not the user is authorised to perform admin actions. */
export const selectIsAdminAuthorized = (state: AppState) =>
  (state.admin.isAdminAuthorized || !state.admin.adminCodeEnabled) && state.admin.adminCodeEnabled !== null;

/** Redux reducer function for initialising global state storage */
export const adminReducer = () => adminSlice.reducer;

/**
 * Redux slice state for managing admin state
 */
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminCodeEnabled: true,
    isAdminAuthorized: false,
  } as AdminState,
  reducers: {
    setAdminCodeRequiredError: (state) => {
      state.adminCodeEnabled = null;
    },
    setAdminCodeRequired: (state, action: PayloadAction<boolean>) => {
      state.adminCodeEnabled = action.payload;
    },
    setAdminAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAdminAuthorized = action.payload;
    },
  },
});

/**
 * Attemps admin authentication using an input code.
 */
export const attemptAdminAuth =
  (inputCode: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const firebaseService = getState().firebase.firebaseService;
    const adminDocFetch = firebaseService.fetchAdminDoc();
    adminDocFetch.catch(() => dispatch(adminSlice.actions.setAdminAuthorized(false)));

    const adminDoc = await adminDocFetch;
    const isAuthorized = sha256(inputCode) === adminDoc.get("code");
    dispatch(adminSlice.actions.setAdminAuthorized(isAuthorized));
  };

/**
 * Initial state of if admin code is required from Firebase
 */
export const fetchAdminRequired = (): AppThunk<void> => async (dispatch, getState) => {
  const firebaseService = getState().firebase.firebaseService;
  const adminDocFetch = firebaseService.fetchAdminDoc();
  adminDocFetch.catch(() => dispatch(adminSlice.actions.setAdminCodeRequiredError()));

  const response = await adminDocFetch;
  const adminCodeRequired = response.get("code") !== undefined && response.get("code") !== "";
  dispatch(adminSlice.actions.setAdminCodeRequired(adminCodeRequired));
};
