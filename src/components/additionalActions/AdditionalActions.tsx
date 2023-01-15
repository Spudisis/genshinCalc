import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAutoFill, setLastCalc } from "../../store/slices/localstorage";
import s from "./addActions.module.scss";

export const AdditionalActions = () => {
  const localstorage = useAppSelector((store) => store.persistedReducer.params);

  const dispatch = useAppDispatch();

  const handleChangeLastCalc = (bool: boolean) => {
    dispatch(setLastCalc(bool));
  };

  const handleChangeAutoFill = (bool: boolean) => {
    dispatch(setAutoFill(bool));
  };

  return (
    <details className={s.details}>
      <summary>Раскрыть дополнительные функции</summary>
      <div className={s.additionalFunction}>
        <button
          className={`${s.buttonFill}  ${localstorage.autoFill ? s.autofill : s.autoFillNone}`}
          onClick={() => handleChangeAutoFill(!localstorage.autoFill)}
        >
          Автозаполнение
        </button>
        <button
          className={`${s.buttonFill}  ${localstorage.lastCalc ? s.autofill : s.autoFillNone}`}
          onClick={() => handleChangeLastCalc(!localstorage.lastCalc)}
        >
          Последний расчет
        </button>
      </div>
    </details>
  );
};
