import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES --> ", res);
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log(err.message);
          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
