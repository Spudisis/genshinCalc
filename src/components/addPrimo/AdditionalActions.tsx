import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLastCalc } from "../../store/slices/localstorage";
import s from "./addActions.module.scss";

type Additional = {
  autoFill: boolean;
  setAutoFill: (n: boolean) => void;
};

export const AdditionalActions = ({ autoFill, setAutoFill }: Additional) => {
  const last = useAppSelector((store) => store.persistedReducer.params);
  const [lastCalc, setLast] = React.useState(last.autoFill);
  const dispatch = useAppDispatch();

  const handleClick = (bool: boolean) => {
    dispatch(setLastCalc(bool));
    setLast(bool);
  };

  return (
    <details className={s.details}>
      <summary className={s.additionalButton}>Раскрыть дополнительные функции</summary>
      <div className={s.additionalFunction}>
        <button
          className={`${s.buttonFill}  ${autoFill ? s.autofill : s.autoFillNone}`}
          onClick={() => setAutoFill(!autoFill)}
        >
          Автозаполнение
        </button>
        <button
          className={`${s.buttonFill}  ${lastCalc ? s.autofill : s.autoFillNone}`}
          onClick={() => handleClick(!lastCalc)}
        >
          Последний расчет
        </button>
      </div>
    </details>
  );
};
