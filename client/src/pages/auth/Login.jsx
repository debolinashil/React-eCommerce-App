import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterComplete.css";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isDisabled, setIsDisabled] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  }, [user]);

  // const roleBasedRedirect = (result) => {
  //   if (result.data.role === "admin") {
  //     navigate("/admin/dashboard");
  //   } else {
  //     navigate("/user/history");
  //   }
  // };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      //send the token to server
      createOrUpdateUser(idTokenResult.token)
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
          // roleBasedRedirect(result);
        })
        .catch((error) => {
          console.log(error);
        });

      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const googleHandler = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
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
          // roleBasedRedirect(result);
        })
        .catch((error) => {
          console.log(error);
        });

      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            className="form-control input-style"
            value={email}
            onChange={emailHandler}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control input-style"
            value={password}
            onChange={passwordHandler}
            placeholder="Enter your password"
          />
        </div>
        <div className="signin-buttons">
          <Button
            onClick={submitHandler}
            type="submit"
            icon={<MailOutlined />}
            size="large"
            className="btn btn-raised register-btn"
          >
            Login
          </Button>
          <Button
            onClick={googleHandler}
            type="submit"
            icon={<FcGoogle />}
            size="large"
            className="btn btn-raised google-btn"
          >
            Continue with Google
          </Button>
        </div>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 form-title">
          <h2>Login</h2>
          {loginForm()}
          <Link to="/forgot/password">
            <span className="forgot-password text-danger">
              Forgot password ?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
