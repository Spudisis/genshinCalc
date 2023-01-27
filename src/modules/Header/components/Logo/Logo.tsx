import React from "react";
import { Link } from "react-router-dom";
import { Site } from "../../../../const/routes";
import logo from "../../assets/logo.png";
import s from "./Logo.module.scss";
export const Logo = () => {
  return (
    <Link to={Site} className={s.logo}>
      <img src={logo} alt="logo" />
    </Link>
  );
};
