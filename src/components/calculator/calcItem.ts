import React from "react";
import { betweenDate } from "../../redux/types/calc";
import { storeItem } from "../../redux/types/items";
import { getNumberDaysNow } from "./getNumberDaysNow";
import { getNumberOfDays } from "./getNumberOfDays";

export const CalcBetween = ({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  let getDays = { between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 };

  if (dateEnd) {
    getDays.between = getNumberOfDays({ dateStart, dateEnd }) + +1;
  }
  getDays.now = getNumberDaysNow(dateStart) + +1;
  getDays.countSave = +countStart + countPrimogems * getDays.now;
  if (getDays.countSave >= 160) {
    getDays.countSumm = Math.floor(getDays.countSave / 160);
  }
  if (getDays.between) {
    getDays.betweenSumm = getDays.between * countPrimogems + +countStart;
  }
  return getDays;
};
