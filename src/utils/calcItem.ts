import { storeItem, Synchronization, valueDayByDay } from "../store/types/items";
import { getNumberDaysNow } from "./getNumberDaysNow";
import { getNumberOfDays } from "./getNumberOfDays";
import { getPeriodDays } from "./getPeriod";

type calc = {
  date_start: string;
  date_end: string | undefined;
  valueStart: number;
  valueAdd: number;
  valueDayByDays: valueDayByDay[];
  Synchronization: Synchronization;
  valueWishes: number;
};

export const CalcBetween = ({ date_start, date_end, valueStart, valueAdd, valueDayByDays, Synchronization }: calc) => {
  let getDays = { betweenDays: 0, nowDays: 0, valueSave: 0, valueSum: 0, betweenSum: 0 };

  if (date_end) {
    const validate = getNumberOfDays({ date_start, date_end }) + +1; //кол-во дней между датами
    validate < 0 ? (getDays.betweenDays = 0) : (getDays.betweenDays = validate); // ставится дата в объект, если есть конечная дата
  }


  const validateNow = getNumberDaysNow(date_start) + +1; // прошедшее количество дней с начала
  validateNow < 0 ? (getDays.nowDays = 0) : (getDays.nowDays = validateNow); //

  const sum = valueDayByDays.reduce(
    (accumulation, elem) => getPeriodDays(elem.date_start, elem.date_end) * elem.value + +accumulation,
    0
  );
  getDays.valueSave = valueStart + Synchronization.res + valueAdd + sum;

  if (getDays.valueSave >= 160) {
    getDays.valueSum = Math.floor(getDays.valueSave / 160);
  }
  if (getDays.betweenDays) {
    const sumBetween = valueDayByDays.reduce(
      (accumulation, elem) => (getNumberOfDays(elem) + 1) * elem.value + +accumulation,
      0
    );
    getDays.betweenSum = sumBetween + Synchronization.res + valueAdd + valueStart;
  }
  console.log(getDays);
  return getDays;
};
