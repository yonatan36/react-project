import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    toast.success("Logout success");
    navigate(ROUTES.HOME);
  };

  return <div>{/* Render any UI or component related to LogOut */}</div>;
};

export default LogOut;
