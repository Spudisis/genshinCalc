import React from "react";
import s from "../style.module.scss";
import { Info } from "./components/Info";
import { PrimoHistory } from "../../modules";
import { AddPrimogems, AutoFill, LastCalc, SyncButton } from "../../modules";
export const CounterPrim = () => {
  return (
    <>
      <Info />
      <details className={s.details}>
        <summary>Раскрыть дополнительные функции</summary>
        <div className={s.additionalFunction}>
          <AutoFill />
          <LastCalc />
          <SyncButton />
        </div>
      </details>
      <AddPrimogems />
      <PrimoHistory />
    </>
  );
};
