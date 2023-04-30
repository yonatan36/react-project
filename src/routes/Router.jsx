import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Regiser from "../Pages/Regiser";
import Login from "../Pages/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES";
import EditCard from "../Pages/EditCard";
import CreateCard from "../Pages/CreateCard";
import Profile from "../Pages/Profile";
import FavCards from "../Pages/FavCards";
import MyCards from "../Pages/MyCards";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogOut from "../components/NavBar/LogOut";

const Router = () => {
  return (
    <Routes>
      <Route exact path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route exact path={ROUTES.REGISTER} element={<Regiser />} />
      <Route exact path={ROUTES.LOGIN} element={<Login />} />
      <Route exact path={ROUTES.ABOUT} element={<About />} />
      <Route exact path={ROUTES.FAV} element={<FavCards />} />

      <Route
        exact
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogOut />} />}
      />
      <Route
        exact
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<MyCards />}
          />
        }
      />
      <Route
        exact
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<Profile />} />}
      />

      <Route
        exact
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCard />}
          />
        }
      />
      <Route
        exact
        path="/create"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCard />}
          />
        }
      />

      <Route
        path="*"
        element={
          <span>
            <h1>404</h1>
            <p>Opsss... page not found</p>
          </span>
        }
      />
    </Routes>
  );
};

export default Router;
