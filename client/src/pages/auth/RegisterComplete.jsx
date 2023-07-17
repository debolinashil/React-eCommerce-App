import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "./RegisterComplete.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password length should not be less than 6!");
      return;
    }

    if (name.length === 0) {
      toast.error("Provide your name please!");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(name);
      if (result.user.emailVerified) {
        //remove the email from local storage
        window.localStorage.removeItem("emailForRegistration");
        //get user token id
        const user = auth.currentUser;
        await user.updatePassword(password);
        await user.updateProfile({ displayName: name });
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        createOrUpdateUser(idTokenResult.token)
          .then((result) => {
            console.log(result);
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
        //redirect
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            className="form-control input-style"
            value={name}
            onChange={nameHandler}
            placeholder="Enter your full name"
            autoFocus
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="email"
            className="form-control input-style"
            value={email}
            disabled
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="password"
            className="form-control input-style"
            value={password}
            onChange={passwordHandler}
            placeholder="Enter your password"
          />
        </div>
        <small className="text-muted">Must be atleast 6 characters long.</small>
        <br />
        <br />
        <div className="signin-buttons">
          <button type="submit" className="btn btn-raised register-btn">
            Complete Registration
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 form-title">
          <h2>Complete Register</h2>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
