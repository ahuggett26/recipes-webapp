import React from "react";
import { Outlet } from "react-router-dom";

/**
 * The root page, within which all other pages are contained.
 * 
 * Contains consistent stylings. 
 * Other component are rendered inside via the  react router {@link Outlet}.
 * 
 * @returns A JSX component of the root page.
 */
function Root() {
  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center text-center">
      <Outlet />
    </div>
  );
}

export default Root;
