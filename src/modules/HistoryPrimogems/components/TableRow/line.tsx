import { ChooseColorCount } from "../ChooseColorCount/ChooseColorCount";
import { copy } from "../PrimoHistory/PrimoHistory";
import s from "./Line.module.scss";
import React from "react";
type cartHistory = {
  id: number;
  date: string;
  dateTime: string;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
  differenceCountPrimogems: number;
  differenceCountWishes: number;
  differenceCountStarglitter: number;
  createClipBoard: (n: copy) => void;
  reserve: number;
  index: number;
};
export const LineTable = React.memo(
  ({
    id,
    date,
    dateTime,
    countPrimogems,
    countWishes,
    countStarglitter,
    differenceCountPrimogems,
    differenceCountWishes,
    differenceCountStarglitter,
    createClipBoard,
    reserve,
    index,
  }: cartHistory) => {
    return (
      <tr
        className={s.item}
        onClick={() => createClipBoard({ date, countPrimogems, countWishes, countStarglitter, index })}
      >
        <td className={s.line}>
          {date} {dateTime && dateTime}
        </td>
        <td className={s.line}>
          <div className={s.main}>
            {countPrimogems}
            {reserve > 0 && (
              <span>
                (-{reserve}={countPrimogems - reserve})
              </span>
            )}
          </div>
          <ChooseColorCount count={differenceCountPrimogems} />
        </td>
        <td className={s.line}>
          <div className={s.main}>{countWishes}</div>
          <ChooseColorCount count={differenceCountWishes} />
        </td>
        <td className={s.line}>
          <div className={s.main}>{countStarglitter}</div>
          <ChooseColorCount count={differenceCountStarglitter} />
        </td>
      </tr>
    );
  }
);
