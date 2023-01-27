import s from "./Button.module.scss";

type buttonT = {
  name: string;
};

export const ButtonSubmit = ({ name }: buttonT) => {
  return (
    <button type="submit" className={s.button}>
      {name}
    </button>
  );
};
