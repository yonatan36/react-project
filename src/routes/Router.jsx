import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Regiser from "../Pages/Regiser";
import Login from "../Pages/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES";
import EditCard from "../Pages/EditCard";
import CreateCard from "../Pages/CreateCard";
import Profile from "../Pages/profile";
import FavCards from "../Pages/FavCards";
import MyCards from "../Pages/MyCards";
import SandBox from "../Pages/sandbox/SandBox";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogOut from "../components/NavBar/LogOut";
import NestedRoutePage from "../Pages/sandbox/NestedRoutePage/NestedRoutePage";
import NestedPage1 from "../Pages/sandbox/NestedRoutePage/NestedPage1";
import NestedPage2 from "../Pages/sandbox/NestedRoutePage/NestedPage2";
import RP1 from "../Pages/sandbox/RP1";
import RP2 from "../Pages/sandbox/RP2";
import ReRenderPage from "../Pages/sandbox/ReRenderPage/ReRenderPage";

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
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandBox />}
          />
        }
      />
      <Route exact path={ROUTES.PROFILE} element={<Profile />} />

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

      <Route path="/rp1" element={<RP1 />} />
      <Route path="/rp2" element={<RP2 />} />
      <Route path="/nr" element={<NestedRoutePage />}>
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
      </Route>

      <Route path="/ReRenderPage" element={<ReRenderPage />} />
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
