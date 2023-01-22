import { storeItem } from "../store/types/items";
import { getNumberDaysNow } from "./getNumberDaysNow";
import { getNumberOfDays } from "./getNumberOfDays";

type calc = {
  date_start: string;
  date_end: string | undefined;
  countStart: number;
  countAdd: number;
  valueDayByDay: number;
  synchValue: number;
};

export const CalcBetween = ({ date_start, date_end, countStart, countAdd, valueDayByDay, synchValue }: calc) => {
  let getDays = { between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 };

  if (date_end) {
    const validate = getNumberOfDays({ date_start, date_end }) + +1;

    validate < 0 ? (getDays.between = 0) : (getDays.between = validate);
  }
  const validateNow = getNumberDaysNow(date_start) + +1;
  validateNow < 0 ? (getDays.now = 0) : (getDays.now = validateNow);

  getDays.countSave = countStart + synchValue + countAdd + valueDayByDay * getDays.now;
  if (getDays.countSave >= 160) {
    getDays.countSumm = Math.floor(getDays.countSave / 160);
  }
  if (getDays.between) {
    getDays.betweenSumm = getDays.between * valueDayByDay + countStart + countAdd;
  }

  return getDays;
};
