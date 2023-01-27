import s from "./Button.module.scss";

type buttonT<T> = {
  click: (param: T) => void;
  name: string;
  param: T;
};

export const Button = <T, >({ click, param, name }: buttonT<T>):React.ReactElement => {
  return (
    <button type="button" className={s.button} onClick={() => click(param)}>
      {name}
    </button>
  );
};
