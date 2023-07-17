import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";

import "./App.css";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { currentUser } from "./functions/auth";
import Header from "./components/nav/Header";
import UserRoutes from "./components/routes/UserRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("USER: ", user);
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((result) => {
            dispatch({
              type: "LOGGED_IN",
              payload: {
                name: result.data.name,
                email: result.data.email,
                token: idTokenResult.token,
                role: result.data.role,
                _id: result.data._id,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    //clean up
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
