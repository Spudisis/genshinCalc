import React from "react";
import s from "./loaderMini.module.scss";
export const LoaderMini = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.lds_spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
