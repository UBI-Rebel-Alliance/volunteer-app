/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
