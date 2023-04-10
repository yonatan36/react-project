
import {  Route, Routes, } from "react-router-dom";
import Home from "../Pages/Home";
import Regiser from "../Pages/Regiser";
import Login from "../Pages/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES";


 const Router = () =>{
    return(

        <Routes>
           <Route exact path={ROUTES.HOME} element={<Home />} />
           <Route exact path={ROUTES.REGISTER} element={<Regiser />} />
           <Route exact path={ROUTES.LOGIN} element={<Login />} />
           <Route exact path={ROUTES.ABOUT} element={<About />} />
        </Routes>
    );
 }
 

 export default Router;
