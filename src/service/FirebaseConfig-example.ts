/**
 * Example config for setting up a firebase database.
 * 
 * Steps for setting up firebase:
 * 1. First, setup a firebase and register an app (see step 1 of https://firebase.google.com/docs/web/setup).
 * 2. Next, navigate to https://console.firebase.google.com/project/{projectId}/settings/general/.
 * 3. Copy the `firebaseConfig` object and paste it here.
 * 4. Rename this file to `FirebaseConfig.ts`.
 * 5. Finally, run `npm run build` and `npm run serve`.
 * 
 * This app should now be setup and running with your firebase database.
 * You can now create new recipe entries and view existing recipes at your will.
 */
export const firebaseConfig = {
  apiKey: "{apiKey}",
  authDomain: "{projectId}.firebaseapp.com",
  projectId: "{projectId}",
  storageBucket: "{projectId}.appspot.com",
  messagingSenderId: "{messagingSenderId}",
  appId: "{appId}",
};
