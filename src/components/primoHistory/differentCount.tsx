import React from "react";
import s from "./PrimoHistory.module.scss";
type different = {
  count: number;
};
export const DifferentCount = ({ count }: different) => {
  return (
    <>
      {count > 0 ? (
        <div className={`${s.change} ${s.up}`}>+{count}</div>
      ) : count < 0 ? (
        <div className={`${s.change} ${s.down}`}>{count}</div>
      ) : (
        <div className={`${s.change} ${s.normal}`}>{count}</div>
      )}
    </>
  );
};
