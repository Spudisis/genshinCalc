import React from "react";
import { NavLink, Routes } from "react-router-dom";
import s from "./Links.module.scss";
export const Links = () => {
  return (
    <div className={s.root}>
      
      <NavLink to="/waiting" className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Ждем персонажа
      </NavLink>
     
    </div>
  );
};
