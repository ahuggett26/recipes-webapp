import React from "react";

interface Properties {
  /** The query to find recipes online when no database recipes are found */
  urlQuery: string;
}

/**
 * Component to display when no recipes can be found via search.
 * 
 * @param props {@link Properties}
 * @returns JSX component displaying no recipes found.
 */
export default function NoResultsFound(props: Properties) {
  return (
    <div>
      <p>There were no recorded recipes found.</p>
      <p>
        <a href={"https://www.bbc.co.uk/food/search?q=" + props.urlQuery}>Search BBC food</a>
      </p>
      <p>
        <a href={"https://www.bbcgoodfood.com/search?q=" + props.urlQuery}>Search BBC goodfood</a>
      </p>
    </div>
  );
}
