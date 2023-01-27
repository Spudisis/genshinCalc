import React from "react";
import s from "./Button.module.scss";

type buttonT<T> = {
  click: (param: T) => void;
  name: string;
  param: T;
};

export const ButtonAuth = <T,>({ click, param, name }: buttonT<T>): React.ReactElement => {
  return (
    <button className={s.auth} onClick={() => click(param)}>
      {name}
    </button>
  );
};
