import React from "react";
import s from "./ChooseColorCount.module.scss";
type different = {
  count: number;
};
export const ChooseColorCount = ({ count }: different) => {
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
