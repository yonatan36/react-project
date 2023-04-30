import React from "react";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBiz }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);

  if (isLoggedIn) {
    if ((isAdmin && payload && payload.isAdmin) || (isBiz && payload && payload.biz)) {
      return element;
    } else {
      toast.error("Opps! You do not have the necessary permissions.");
      return <Navigate to={ROUTES.LOGIN} />;
    }
  }
};

export default SuperProtectedRoute;
