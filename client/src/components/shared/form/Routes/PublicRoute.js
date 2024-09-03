/*import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return Children;
  }
};

export default PublicRoute;
*/

import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children; // Render child components if no token is found
  }
};

export default PublicRoute;
