import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../component/header";
import { isLoggedIn } from "../helpers/utils/auth.util";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = isLoggedIn();

  return isAuthenticated ? (
    <React.Fragment>
      <Header />
      {element}
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
