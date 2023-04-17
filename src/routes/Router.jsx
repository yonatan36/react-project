
import {  Route, Routes, } from "react-router-dom";
import Home from "../Pages/Home";
import Regiser from "../Pages/Regiser";
import Login from "../Pages/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES";
import EditCard from "../Pages/EditCard";
import Stam from "../Pages/stam";



 const Router = () =>{
    return(

        <Routes>
           <Route exact path={ROUTES.HOME} element={<Home />} />
           <Route exact path={ROUTES.REGISTER} element={<Regiser />} />
           <Route exact path={ROUTES.LOGIN} element={<Login />} />
           <Route exact path={ROUTES.ABOUT} element={<About />} />
           <Route exact path="/stam" element={<Stam />} />
           <Route exact path="/edit/:id" element={<EditCard />} />
           <Route exact path="*" element={<h1>404</h1>}/>
        </Routes>
    );
 }
 

 export default Router;
