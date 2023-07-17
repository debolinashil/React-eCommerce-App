import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterComplete.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const inputChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    if (email) {
      auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          setEmail("");
          toast.success("Password reset link has been sent to your mail.");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };

  const forgotPasswordForm = () => {
    return (
      <form onSubmit={submitHandler}>
        <input
          type="email"
          className="form-control input-style"
          value={email}
          onChange={inputChangeHandler}
          placeholder="Enter your email"
        />
        <br />
        <div className="signin-buttons">
          <button type="submit" className="btn btn-raised register-btn">
            Continue
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 form-title">
          <h2>Forgot Password</h2>
          {forgotPasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
