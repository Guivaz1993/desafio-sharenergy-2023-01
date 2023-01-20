import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Cats from "../pages/Cats";
import Clients from "../pages/Clients";
import Dogs from "../pages/Dogs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { getItem } from "../utils/Storage";

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem("token");
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}

export default index;
