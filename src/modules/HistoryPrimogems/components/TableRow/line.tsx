import { ChooseColorCount } from "../ChooseColorCount/ChooseColorCount";
import { Copy } from "../PrimoHistory/PrimoHistory";
import s from "./Line.module.scss";
import React from "react";
import { primogems } from "../../../../store/types/items";

type LineTableT = { reserve: number; index: number; createClipBoard: (n: Copy) => void } & Omit<
  primogems,
  "personId" | "createdAt" | "updatedAt"
>;

export const LineTable = React.memo(
  ({
    id,
    date,
    dateTime,
    valuePrimogems,
    valueWishes,
    valueStarglitter,
    differenceValuePrimogems,
    differenceValueWishes,
    differenceValueStarglitter,
    createClipBoard,
    reserve,
    index,
  }: LineTableT) => {
    return (
      <tr
        className={s.item}
        onClick={() => createClipBoard({ date, valuePrimogems, valueWishes, valueStarglitter, index })}
      >
        <td className={s.line}>
          {date} {dateTime && dateTime}
        </td>
        <td className={s.line}>
          <div className={s.main}>
            {valuePrimogems}
            {reserve > 0 && (
              <span>
                (-{reserve}={valuePrimogems - reserve})
              </span>
            )}
          </div>
          <ChooseColorCount count={differenceValuePrimogems} />
        </td>
        <td className={s.line}>
          <div className={s.main}>{valueWishes}</div>
          <ChooseColorCount count={differenceValueWishes} />
        </td>
        <td className={s.line}>
          <div className={s.main}>{valueStarglitter}</div>
          <ChooseColorCount count={differenceValueStarglitter} />
        </td>
      </tr>
    );
  }
);
