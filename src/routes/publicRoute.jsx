import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../component/header";
import { isLoggedIn } from "../helpers/utils/auth.util";

const PublicRoute = ({ element }) => {
  const isAuthenticated = !isLoggedIn();

  return isAuthenticated ? (
    <React.Fragment>
      <Header />
      {element}
    </React.Fragment>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoute;
