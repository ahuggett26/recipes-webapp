import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FirebaseService from "../service/FirebaseService";
import { sha256 } from "js-sha256";
import { AppState } from "./Store";

// Define the TS type for the admin slice's state
export interface AdminState {
  // True if an admin code has been enabled by the user.
  adminCodeEnabled: boolean;
  // True if a correct admin code has been entered by the user.
  // This means the user will be able to access admin-only functions, such as submitting recipes.
  // TODO: a more secure method should be used here instead - try JWT/authenticating the database
  isAdminAuthorized: boolean;
}

/** Selector to determine whether or not the user is authorised to perform admin actions. */
export const selectIsAdminAuthorized = (state: AppState) =>
  state.admin.isAdminAuthorized || !state.admin.adminCodeEnabled;

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminRequired.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.adminCodeEnabled = action.payload;
    });
    builder.addCase(attemptAdminAuthentication.rejected, (state) => {
      state.isAdminAuthorized = false;
    });
    builder.addCase(attemptAdminAuthentication.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.isAdminAuthorized = action.payload;
    });
  },
});

interface AttemptAdminAuthParams {
  inputCode: string;
  firebaseService: FirebaseService;
}

/** Verifies whether an admin code is valid and sets it in state */
export const attemptAdminAuthentication = createAsyncThunk(
  "attemptAdminAuth",
  async (params: AttemptAdminAuthParams) => {
    const adminDoc = await params.firebaseService.fetchAdminDoc();

    return sha256(params.inputCode) === adminDoc.get("code");
  },
);

/**
 * Initial state of if admin code is required from Firebase
 */
export const fetchAdminRequired = createAsyncThunk("fetchAdminRequired", async (firebaseService: FirebaseService) => {
  const response = await firebaseService.fetchAdminDoc();

  // The value we return becomes the `fulfilled` action payload
  return response.get("code") !== undefined && response.get("code") !== "";
});
