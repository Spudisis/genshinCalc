import React from "react";
import { CreateHero } from "../../components/CreateHero/CreateHero";
import s from "./main.module.scss";
export const Main = () => {
  return (
    <div className={s.root}>
      <CreateHero />
    </div>
  );
};
