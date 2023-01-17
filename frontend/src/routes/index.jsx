import { Routes, Outlet, Route, Navigate } from "react-router-dom";

import { getItem } from "../utils/Storage";

import Login from "../pages/Login";

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem("token");
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutes redirectTo="/" />}>
        {/* <Route path='/home' element={<Home />} />
        <Route path='/cats' element={<Clients />} />
        <Route path='/dogs' element={<ClientsDetail />} />
        <Route path='/clients' element={<DebtCollection />} /> */}
      </Route>
    </Routes>
  );
}

export default index;
