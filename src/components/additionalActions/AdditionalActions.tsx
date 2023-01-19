import axios from "axios";
import React from "react";
import { UpdateStore } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAutoFill, setLastCalc } from "../../store/slices/localstorage";
import { setSynchro } from "../../store/slices/synchronization";
import { Sync } from "../sync/sync";
import s from "./addActions.module.scss";

export const AdditionalActions = () => {
  const localstorage = useAppSelector((store) => store.persistedReducer.params);
  const synchronization = useAppSelector((store) => store.syncSlice.synchro);

  const dispatch = useAppDispatch();

  const [modalSync, setModalSync] = React.useState(false);

  const handleChangeLastCalc = (bool: boolean) => {
    dispatch(setLastCalc(bool));
  };

  const handleChangeAutoFill = (bool: boolean) => {
    dispatch(setAutoFill(bool));
  };
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalSync(false);
    }
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
        <div className={s.relative} ref={ref}>
          <button
            className={`${s.buttonFill}  ${modalSync || synchronization.length !== 0 ? s.autofill : s.autoFillNone}`}
            onClick={() => setModalSync(!modalSync)}
          >
            Синхронизация
          </button>
          {modalSync && <Sync />}
        </div>
      </div>
    </details>
  );
};
