import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewRecipeButton from "./components/newrecipe/NewRecipeButton";
import NewRecipePage from "./components/newrecipe/NewRecipePage";
import Root from "./components/Root";
import FirebaseService from "./service/FirebaseService";
import HomeButton from "./components/HomeButton";
import DesktopFullDisplay from "./components/recipe/DesktopFullDisplay";
import FullDisplay from "./components/recipe/FullDisplay";
import MobileFullDisplay from "./components/recipe/MobileFullDisplay";
import AdminButton from "./components/admin/AdminButton";

const firebaseService = new FirebaseService();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <>
            <AdminButton />
            <NewRecipeButton />
            <Home firebase={firebaseService} />
          </>
        ),
      },
      {
        path: "/create-new",
        element: (
          <>
            <HomeButton />
            <NewRecipePage firebase={firebaseService} />
          </>
        ),
      },
      {
        path: "/desktop-view",
        element: (
          <>
            <HomeButton />
            <FullDisplay firebase={firebaseService} child={(recipe) => <DesktopFullDisplay recipe={recipe} />} />
          </>
        ),
      },
      {
        path: "/mobile-view",
        element: <FullDisplay firebase={firebaseService} child={(recipe) => <MobileFullDisplay recipe={recipe} />} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
