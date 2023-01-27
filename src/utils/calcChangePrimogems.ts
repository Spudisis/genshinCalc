import { valuesForm } from "../modules/AddPrimogems/components/FormAdd/formAdd";
import { primogems } from "../store/types/items";
const JSJoda = require("@js-joda/core");
const checkTwoDigit = (number: number) => {
  return number < 10 ? "0" + number : number;
};

export type objectFull = {
  date: string;
  dateTime: string;
  valuePrimogems: number;
  valueWishes: number;
  valueStarglitter: number;
  differenceValuePrimogems: number;
  differenceValueWishes: number;
  differenceValueStarglitter: number;
};

export const calcChangePrimogems = (obj: valuesForm, primogems: primogems[]) => {
  const lastChange = primogems.length !== 0 && primogems[0];

  const date = getDateNow();
  const dateTime = getTimeNow();

  if (lastChange) {
    return {
      date: date,
      dateTime: dateTime,
      valuePrimogems: obj.valuePrimogems,
      valueWishes: obj.valueWishes,
      valueStarglitter: obj.valueStarglitter,
      differenceValuePrimogems: obj.valuePrimogems - lastChange.valuePrimogems,
      differenceValueWishes: obj.valueWishes - lastChange.valueWishes,
      differenceValueStarglitter: obj.valueStarglitter - lastChange.valueStarglitter,
    };
  }
  return {
    date: date,
    dateTime: dateTime,
    valuePrimogems: obj.valuePrimogems,
    valueWishes: obj.valueWishes,
    valueStarglitter: obj.valueStarglitter,
    differenceValuePrimogems: 0,
    differenceValueWishes: 0,
    differenceValueStarglitter: 0,
  };
};

export const getDateNow = () => {
  let LocalDate = JSJoda.LocalDate;
  const dateNow = LocalDate.now();
  return dateNow.year() + "-" + checkTwoDigit(dateNow.monthValue()) + "-" + checkTwoDigit(dateNow.dayOfMonth());
};

export const getTimeNow = () => {
  let localTime = JSJoda.LocalTime;
  const timeNow = localTime.now();
  return checkTwoDigit(timeNow.hour()) + ":" + checkTwoDigit(timeNow.minute()) + ":" + checkTwoDigit(timeNow.second());
};
