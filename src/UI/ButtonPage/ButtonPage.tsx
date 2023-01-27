
import { NavLink } from "react-router-dom";

import s from "./ButtonPage.module.scss";

type buttonPageT = {
  url: string;
  namePage: string;
};

export const ButtonPage = ({ url, namePage }: buttonPageT) => {
  return (
    <NavLink to={url} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
      {namePage}
    </NavLink>
  );
};
