import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (event) => {
    setCurrent(event.key);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setCurrent("home");
  }, [user]);

  const logoutHandler = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const authenticatedItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link to="/cart">Cart</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: !user ? "guest" : user.name,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Option 1",
          key: "setting:1",
        },
        {
          label: "Option 2",
          key: "setting:2",
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ],
      className: "ms-auto",
      onClick: logoutHandler,
    },
  ];

  const unauthenticatedItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link to="/cart">Cart</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <UserOutlined />,
      className: "ms-auto",
    },
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
  ];

  const items = user ? authenticatedItems : unauthenticatedItems;

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
