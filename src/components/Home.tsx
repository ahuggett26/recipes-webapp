import React, { useState } from "react";
import NameSearch from "./search/NameSearch";
import IngredientSearch from "./search/IngredientSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRandomRecipe, selectRecipeReadiness } from "../api/RecipeSlice";

/**
 * The home page, to display on first open.
 *
 * Contains the name search, ingredient search & random recipe.
 *
 * @param props {@link Properties}
 * @returns A JSX component of the home page.
 */
function Home() {
  const navigate = useNavigate();
  const recipesReadiness = useSelector(selectRecipeReadiness);
  const recipesReady = recipesReadiness === "success";
  const [searchingIngredients, setSearchingIngredients] = useState(false);
  const [searchTerm, setSearch] = useState("");
  const centralView = searchTerm === "" && !searchingIngredients ? "w-50 h-50" : "w-75 h-75";
  // const randomRecipe = useSelector(selectRandomRecipe);

  return (
    <div className={centralView}>
      <h1>Recipes</h1>
      <div className={recipesReady ? "d-none" : ""}>
        <span>
          <i>Please wait while recipes are loading...</i>
        </span>
        <span className="spinner-border spinner-border-sm ms-2" role="status" />
      </div>
      {!searchingIngredients && (
        <NameSearch recipesReady={recipesReady} nameSearch={searchTerm} setSearch={setSearch} />
      )}
      {searchingIngredients && (
        <IngredientSearch
          recipesReady={recipesReady}
          search={searchTerm}
          setSearch={(ing) => setSearch(ing.join(","))}
        />
      )}
      {searchTerm === "" && (
        <>
          <div className="p-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!recipesReady}
              onClick={() => setSearchingIngredients((prev) => !prev)}
            >
              <i className="bi bi-funnel-fill pe-2"></i>
              {searchingIngredients ? "Search by Name" : "Search by Ingredient"}
            </button>
          </div>
          {!searchingIngredients && (
            <div className="p-2">
              <button
                type="button"
                className="btn"
                disabled={!recipesReady}
                // onClick={() => navigate("/desktop-view?recipe=" + randomRecipe?.name.replaceAll(" ", "_"))}
                onClick={() => navigate("/desktop-view?recipe=not_real_recipe")}
              >
                <i className="bi bi-shuffle pe-2"></i>
                Pick a random recipe
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
