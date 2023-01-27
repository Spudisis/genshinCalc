import React from "react";

import s from "./SyncModal.module.scss";

import { List } from "../List/List";
import { Synchronization } from "../../../../store/types/items";

export const SyncModal = ({ synchronization }: { synchronization: Synchronization[] }) => {
  const [sum, setSum] = React.useState(0);

  React.useEffect(() => {
    synchronization.forEach((elem) => {
      console.log(elem.typeValue === "percent");
    });

    const sum = synchronization.reduce(
      (sumAccumulator, elem) => (elem.typeValue === "percent" ? +elem.value + +sumAccumulator : sumAccumulator),
      0
    );
    setSum(sum);
  }, [synchronization]);

  return (
    <div className={s.modal}>
      <div className={s.wrapper}>
        <ul>
          {synchronization &&
            synchronization.map((elem: Synchronization, id) => <List key={id + "syncModal"} {...elem} sum={sum} />)}
        </ul>
      </div>
    </div>
  );
};
