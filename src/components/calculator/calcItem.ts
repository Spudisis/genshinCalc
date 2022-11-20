import React from "react";
import { betweenDate } from "../../redux/types/calc";
import { storeItem } from "../../redux/types/items";
import { getNumberDaysNow } from "./getNumberDaysNow";
import { getNumberOfDays } from "./getNumberOfDays";

export const CalcBetween = ({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  let getDays = { between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 };

  if (dateEnd) {
    const validate = getNumberOfDays({ dateStart, dateEnd }) + +1;

    validate < 0 ? (getDays.between = 0) : (getDays.between = validate);
  }
  const validateNow = getNumberDaysNow(dateStart) + +1;
  validateNow < 0 ? (getDays.now = 0) : (getDays.now = validateNow);

  getDays.countSave = +countStart + countPrimogems * getDays.now;
  if (getDays.countSave >= 160) {
    getDays.countSumm = Math.floor(getDays.countSave / 160);
  }
  if (getDays.between) {
    getDays.betweenSumm = getDays.between * countPrimogems + +countStart;
  }
  return getDays;
};
