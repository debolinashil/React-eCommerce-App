import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { toast } from "react-toastify";
import { Button } from "antd";
import { auth } from "../../firebase";

const Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const newPwdHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const repeatPwdHandler = (event) => {
    setRepeatPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (newPassword === repeatPassword) {
      console.log("Form submit handler");
      const user = await auth.currentUser;
      console.log("user for password update --> ", user);
      console.log("New password: ", newPassword);
      console.log(typeof newPassword);
      user
        .updatePassword(newPassword)
        .then(() => {
          console.log("password updated");
          setNewPassword("");
          setRepeatPassword("");
          toast.success(
            "Password changed. Please login with your new passowrd."
          );
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Something went wrong!!");
    }
  };

  const setPasswordForm = () => {
    return (
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            type="password"
            className="form-control input-style"
            placeholder="New Password"
            value={newPassword}
            onChange={newPwdHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control input-style"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={repeatPwdHandler}
          />
        </div>
        <div className="signin-buttons">
          <Button
            onClick={formSubmitHandler}
            type="submit"
            size="large"
            className="btn btn-raised register-btn"
          >
            Set Password
          </Button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-4 offset-md-3">
          <br />
          <h2>Password Update</h2>
          <br />
          {setPasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
