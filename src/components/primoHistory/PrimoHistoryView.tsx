import React from "react";
import { primogems } from "../../store/types/items";
import { LineTable } from "./line";
import { copy } from "./PrimoHistory";

import wish from "../../assets/Objeto_Destino_entrelazado.webp";
import primogemImg from "../../assets/Item_Primogem.webp";
import starglitter from "../../assets/Item_Masterless_Starglitter.webp";

import s from "./PrimoHistory.module.scss";
export type objPrimogems = {
  primogem: primogems[];
  createClipBoard: (n: copy) => void;
  reserve: number;
};
export const PrimoHistoryView = ({ primogem, createClipBoard, reserve }: objPrimogems) => {
  return (
    <table>
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
      <tbody>
        {primogem.map((obj: primogems, index: number) => (
          <LineTable
            id={obj.id}
            date={obj.date}
            countPrimogems={obj.countPrimogems}
            countWishes={obj.countWishes}
            countStarglitter={obj.countStarglitter}
            differenceCountPrimogems={obj.differenceCountPrimogems}
            differenceCountWishes={obj.differenceCountWishes}
            differenceCountStarglitter={obj.differenceCountStarglitter}
            createClipBoard={createClipBoard}
            reserve={index === 0 ? reserve : 0}
            key={obj.id}
          />
        ))}
      </tbody>
    </table>
  );
};
