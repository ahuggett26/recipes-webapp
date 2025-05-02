import { createSlice } from "@reduxjs/toolkit";
import FirebaseService from "../service/FirebaseService";
import { AppState } from "./Store";

// Define the TS type for the firebase slice's state
export interface FirebaseState {
  // The firebase service
  firebaseService: FirebaseService;
}

/** Selector to fetch the firebase service. */
export const selectFirebaseService = (state: AppState) => state.firebase.firebaseService;

/** Redux reducer function for initialising global state storage */
export const firebaseReducer = () => firebaseSlice.reducer;

/**
 * Redux slice state for managing admin state
 */
const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    firebaseService: new FirebaseService(),
  } as FirebaseState,
  reducers: {},
});
