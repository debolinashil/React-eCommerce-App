import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterComplete.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  const submitHandler = async (event) => {
    event.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL, //fetching the value from .env file
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);

      toast.success(
        `Email has been sent to ${email}. Click on the link sent to your email address to complete the process.`
      );

      window.localStorage.setItem("emailForRegistration", email);

      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const registerForm = () => {
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
            Register
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 form-title">
          <h2>Register</h2>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
