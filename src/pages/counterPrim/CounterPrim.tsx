import React from "react";
import s from "../style.module.scss";
import { Info } from "./components/Info";
import { PrimoHistory, AddPrimogems } from "../../components";
export const CounterPrim = () => {
  return (
    <div className={s.root}>
      <Info />
      <AddPrimogems />
      <PrimoHistory />
    </div>
  );
};
