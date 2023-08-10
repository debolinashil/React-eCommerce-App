import React from "react";
import { Route, Routes } from "react-router-dom";
import History from "../../pages/user/History";
import Password from "../../pages/user/Password";
import Wishlist from "../../pages/user/Wishlist";
import LoadingToRedirect from "./LoadingToRedirect";
import { useSelector } from "react-redux";

const UserRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Routes>
      <Route path="history" element={<History />} />
      <Route path="password" element={<Password />} />
      <Route path="wishlist" element={<Wishlist />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoutes;
