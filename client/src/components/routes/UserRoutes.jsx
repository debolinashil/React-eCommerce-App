import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import History from "../../pages/user/History";

const UserRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Routes>
      <Route path="history" element={<History />} />
    </Routes>
  ) : (
    <h1 className="text-danger">Loading...</h1>
  );
};

export default UserRoutes;
