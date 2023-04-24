import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import axios from "axios";

const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await axios.get("/users/userInfo");
      const payload = jwt_decode(token);
      dispatch(authActions.login(payload));
    } catch (err) {}
  };
};
export default useLoggedIn;
