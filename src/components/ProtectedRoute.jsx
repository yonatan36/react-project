import React from "react";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default ProtectedRoute;
