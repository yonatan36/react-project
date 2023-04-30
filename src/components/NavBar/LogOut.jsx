import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import axios from "axios";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/users/userInfo");
      const firstName = response.data.firstName;
      localStorage.clear();
      dispatch(authActions.logout());
      toast.success(`Goodbye ${firstName}! We hope to see you again soon.`);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    }
  };

  return <div>{/* Render any UI or component related to LogOut */}</div>;
};

export default LogOut;
