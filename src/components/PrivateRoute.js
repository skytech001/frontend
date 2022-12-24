import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  const { name } = user;

  if (!name) {
    return <Navigate replace to="/signin" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
