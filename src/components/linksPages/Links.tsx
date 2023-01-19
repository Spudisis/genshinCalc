import { NavLink } from "react-router-dom";
import { counterPrim, Site, waiting } from "../../const/routes";
import s from "./Links.module.scss";
export const Links = () => {
  return (
    <div className={s.root}>
      <NavLink to={Site + waiting} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Ждем персонажа
      </NavLink>
      <NavLink to={Site + counterPrim} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Счетчик примогемов
      </NavLink>
    </div>
  );
};
