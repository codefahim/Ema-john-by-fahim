import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [logInUser, setLogInUser] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logInUser.email || sessionStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
