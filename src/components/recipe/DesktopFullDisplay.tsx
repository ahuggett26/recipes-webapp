import React, { useEffect, useState } from "react";
import Recipe from "../../model/Recipe";
import QRCode from "qrcode.react";
import { internalIpV4 } from "internal-ip";
import { renderIngredient } from "../../model/Ingredient";
import "./FullDisplay.css";
import { Link } from "react-router-dom";

interface Properties {
  /** The recipe to display. */
  recipe: Recipe;
}

/**
 * A full display for viewing a recipe on desktop.
 *
 * @param props {@link Properties}
 * @returns A JSX component containing a recipe's full view.
 */
export default function DesktopFullDisplay(props: Properties) {
  const [ipAddress, setIpAddress] = useState("");
  const [servings, setServings] = useState(props.recipe.servings);

  const URLorigin = location.origin === "http://localhost:3000" ? `http://${ipAddress}:3000` : location.origin;
  const mobileUrl = `${URLorigin}/mobile-view/?recipe=${props.recipe.name.replaceAll(" ", "_")}&servings=${servings}`;

  useEffect(() => {
    getIpAdress();
  });

  async function getIpAdress() {
    const ip = await internalIpV4();
    setIpAddress(ip ?? "");
  }

  return (
    <>
      <h1 className="pt-5">{props.recipe.name}</h1>
      <div className="d-flex justify-content-center align-items-center gap-5 mb-2">
        <img src={props.recipe.imgSrc} className="object-fit-cover" width={240} height={240} />
        <Link to={mobileUrl}>
          <QRCode value={mobileUrl} />
        </Link>
      </div>
      <div className="d-flex justify-content-center gap-5 mb-2">
        <span>
          Prep time: <b>{props.recipe.prepTimeMins}mins</b>
        </span>
        <span>
          Cook time: <b>{props.recipe.cookTimeMins}mins</b>
        </span>
      </div>
      <span className="px-3">
        Servings:
        <datalist id="valid-servings">
          <option value={1}></option>
          <option value={2}></option>
          <option value={3}></option>
          <option value={4}></option>
        </datalist>
        <input
          className="ms-2 servingsInput"
          placeholder={props.recipe.servings.toString()}
          list="valid-servings"
          maxLength={1}
          onChange={(event) => {
            const valStr = event.target.value;
            const val = valStr === "" ? props.recipe.servings : Number.parseInt(valStr);
            setServings(val ?? props.recipe.servings);
          }}
        />
      </span>
      <h3 className="mt-3">Ingredients:</h3>
      <ul className="px-4 centerList">
        {props.recipe.mainIngredients.map((ing) => renderIngredient(ing, servings / props.recipe.servings))}
        {props.recipe.secondaryIngredients?.map((ing) => renderIngredient(ing, servings / props.recipe.servings))}
      </ul>
      <h3>Steps:</h3>
      <ol className="px-3 pb-5 centerList">
        {props.recipe.steps.map((step, index) => (
          <li key={`step-${index}`} className="mb-2">
            {step}
          </li>
        ))}
      </ol>
    </>
  );
}
