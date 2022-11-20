import React from "react";
import { betweenDate } from "../../redux/types/calc";
import { storeItem } from "../../redux/types/items";

export const CalcBetween = ({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;

  let getDays = { between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 };

  function getNumberOfDays({ dateStart, dateEnd }: betweenDate) {
    const start_date = new LocalDate.parse(dateStart);
    const end_date = new LocalDate.parse(dateEnd);

    const count = JSJoda.ChronoUnit.DAYS.between(start_date, end_date);
    return count;
  }
  function getNumberDaysNow(dateStart: string) {
    const start_date = new LocalDate.parse(dateStart);
    const count = JSJoda.ChronoUnit.DAYS.between(start_date, LocalDate.now());
    return count;
  }
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
