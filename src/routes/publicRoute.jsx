import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../component/header";

const PublicRoute = ({ element }) => {
    const isAuthenticated = true;

    return isAuthenticated ?
        <React.Fragment>
            <Header />
            {element}
        </React.Fragment>
        : <Navigate to="/login" />;
};

export default PublicRoute;