import React from "react";
import { primogems } from "../../../../store/types/items";

import { LineTable } from "../TableRow/line";
import { Copy } from "../PrimoHistory/PrimoHistory";

import wish from "../../../../assets/Objeto_Destino_entrelazado.webp";

import primogemImg from "../../assets/Item_Primogem.webp";
import starglitter from "../../assets/Item_Masterless_Starglitter.webp";

import s from "./PrimoHistory.module.scss";
import { status } from "../../../../store/types/user";
import { LoaderMini } from "../../../../components";

export type objPrimogems = {
  primogem: primogems[];
  createClipBoard: (n: Copy) => void;
  reserve: number;
  statusLoading: status;
};
export const PrimoHistoryView = React.memo(({ primogem, createClipBoard, reserve, statusLoading }: objPrimogems) => {
  const lines =
    statusLoading === status.FULFILLED &&
    primogem.map((obj: primogems, index: number) => (
      <LineTable
        id={obj.id}
        date={obj.date}
        dateTime={obj.dateTime ? obj.dateTime : ""}
        valuePrimogems={obj.valuePrimogems}
        valueWishes={obj.valueWishes}
        valueStarglitter={obj.valueStarglitter}
        differenceValuePrimogems={obj.differenceValuePrimogems}
        differenceValueWishes={obj.differenceValueWishes}
        differenceValueStarglitter={obj.differenceValueStarglitter}
        createClipBoard={createClipBoard}
        reserve={index === 0 ? reserve : 0}
        index={index}
        key={obj.id}
      />
    ));

  return (
    <div className={s.wrapper}>
      <table className={`${s.table}`}>
        <thead className={s.theadTable}>
          <tr className={s.itemHead}>
            <td className={s.line}>Дата</td>
            <td className={s.line}>
              <img src={primogemImg} alt="primogemImg" />
            </td>
            <td className={s.line}>
              <img src={wish} alt="wish" />
            </td>
            <td className={s.line}>
              <img src={starglitter} alt="starglitter" />
            </td>
          </tr>
        </thead>

        {statusLoading === status.FULFILLED && <tbody>{lines}</tbody>}
      </table>
      {statusLoading === status.LOADING && <LoaderMini />}
    </div>
  );
});
