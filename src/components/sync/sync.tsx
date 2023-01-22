import React from "react";

import { useAppSelector } from "../../store/hooks";

import s from "./sync.module.scss";

import { AddSync } from "./AddSync";
import { FormSync } from "./SyncView";

export const Sync = () => {
  const { uid, store } = useAppSelector((state) => state.person);
  const { primogems } = useAppSelector((state) => state.primogemSlice);
  const synchro = useAppSelector((store) => store.syncSlice.synchro);

  const [synchroName, setSynchroName] = React.useState<string[]>([]);
  const [storeName, setStoreName] = React.useState<string[]>([]);
  const [sum, setSum] = React.useState<number>(0);

  React.useEffect(() => {
    const names = synchro.map((elem) => {
      return elem.name;
    });

    setSynchroName(names);
    const sum = synchro.reduce((prev, elem) => (elem.typeValue === "percent" ? +prev + +elem.value : +prev + +0), 0);

    sum && setSum(sum);

    //тут был код uid && synchro.length !== 0 && UpdateStore({ uid, store, primogems, synchro });
  }, [uid, store, primogems, synchro]);

  React.useEffect(() => {
    const names = store.map((elem) => {
      return elem.name;
    });
    setStoreName(names);
  }, [store]);

  return (
    <div className={s.modal}>
      <div className={s.wrapper}>
        <details>
          <summary>Создать</summary>
          <AddSync store={storeName} synchroName={synchroName} sum={sum} />
        </details>

        <ul>
          {synchro &&
            synchro.map((elem, id) => (
              <FormSync
                key={id + "syncModal"}
                id={elem.id}
                synchro={synchro}
                name={elem.name}
                value={elem.value}
                typeValue={elem.typeValue}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};
