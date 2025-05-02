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
import HomeButton from "./components/HomeButton";
import DesktopFullDisplay from "./components/recipe/DesktopFullDisplay";
import FullDisplay from "./components/recipe/FullDisplay";
import MobileFullDisplay from "./components/recipe/MobileFullDisplay";
import AdminPage from "./components/admin/AdminPage";
import AdminButton from "./components/admin/AdminButton";
import NewIngredientPage from "./components/newingredient/NewIngredientPage";
import IngredientList from "./components/ingredientlist/IngredientList";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./api/Store";

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
            <Home />
          </>
        ),
      },
      {
        path: "/admin",
        element: (
          <>
            <HomeButton />
            <AdminPage />
          </>
        ),
      },
      {
        path: "/create-new",
        element: (
          <>
            <HomeButton />
            <NewRecipePage />
          </>
        ),
      },
      {
        path: "/create-ingredient",
        element: (
          <>
            <HomeButton />
            <NewIngredientPage />
          </>
        ),
      },
      {
        path: "/ingredient-list",
        element: (
          <>
            <HomeButton />
            <IngredientList />
          </>
        ),
      },
      {
        path: "/desktop-view",
        element: (
          <>
            <HomeButton />
            <FullDisplay child={(recipe) => <DesktopFullDisplay recipe={recipe} />} />
          </>
        ),
      },
      {
        path: "/mobile-view",
        element: <FullDisplay child={(recipe) => <MobileFullDisplay recipe={recipe} />} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
