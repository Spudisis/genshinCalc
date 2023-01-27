import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import s from "../../../../UI/ButtonAdditional/ButtonAdditional.module.scss";
import { setLastCalc } from "../../store/reducer";

export const LastCalc = () => {
  const localstorage = useAppSelector((store) => store.persistedReducer.params);

  const dispatch = useAppDispatch();

  const handleChangeLastCalc = (bool: boolean) => {
    dispatch(setLastCalc(bool));
  };

  return (
    <button
      className={`${s.buttonFill}  ${localstorage.lastCalc ? s.autofill : s.autoFillNone}`}
      onClick={() => handleChangeLastCalc(!localstorage.lastCalc)}
    >
      Последний расчет
    </button>
  );
};
