import { Routes, Outlet, Route, Navigate } from "react-router-dom";

import { getItem } from "../utils/Storage";

import Login from "../pages/Login";
import Cats from "../pages/Cats";
import Dogs from "../pages/Dogs";
import Home from "../pages/Home";

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem("token");
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path='/home' element={<Home />} />
        <Route path='/cats' element={<Cats />} />
        <Route path='/dogs' element={<Dogs />} />
        {/* <Route path='/clients' element={<DebtCollection />} /> */}
      </Route>
    </Routes>
  );
}

export default index;
