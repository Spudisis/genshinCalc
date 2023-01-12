import { DifferentCount } from "./differentCount";
import { copy } from "./PrimoHistory";
import s from "./PrimoHistory.module.scss";

type cartHistory = {
  id: number;
  date: string;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
  differenceCountPrimogems: number;
  differenceCountWishes: number;
  differenceCountStarglitter: number;
  createClipBoard: (n: copy) => void;
  reserve: number;
};
export const LineTable = ({
  id,
  date,
  countPrimogems,
  countWishes,
  countStarglitter,
  differenceCountPrimogems,
  differenceCountWishes,
  differenceCountStarglitter,
  createClipBoard,
  reserve,
}: cartHistory) => {
  return (
    <tr className={s.item} onClick={() => createClipBoard({ date, countPrimogems, countWishes, countStarglitter })}>
      <td className={s.line}>{date}</td>
      <td className={s.line}>
        <div className={s.main}>
          {countPrimogems}
          {reserve > 0 && (
            <span>
              (-{reserve}={countPrimogems - reserve})
            </span>
          )}
        </div>
        <DifferentCount count={differenceCountPrimogems} />
      </td>
      <td className={s.line}>
        <div className={s.main}>{countWishes}</div>
        <DifferentCount count={differenceCountWishes} />
      </td>
      <td className={s.line}>
        <div className={s.main}>{countStarglitter}</div>
        <DifferentCount count={differenceCountStarglitter} />
      </td>
    </tr>
  );
};
