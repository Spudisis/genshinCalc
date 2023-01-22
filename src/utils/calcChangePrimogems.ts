import { objForm } from "../components/addPrimo/AddPrimogems";
import { primogems } from "../store/types/items";
const JSJoda = require("@js-joda/core");
const checkTwoDigit = (number: number) => {
  return number < 10 ? "0" + number : number;
};

export const calcChangePrimogems = (
  obj: objForm,

  primogems: primogems[]
) => {
  const lastChange = primogems.length !== 0 && primogems[0];

  const date = getDateNow();
  const dateTime = getTimeNow();

  if (lastChange) {
    return {
      date: date,
      dateTime: dateTime,
      countPrimogems: obj.countPrimogems,
      countWishes: obj.countWishes,
      countStarglitter: obj.countStarglitter,
      differenceCountPrimogems: obj.countPrimogems - lastChange.countPrimogems,
      differenceCountWishes: obj.countWishes - lastChange.countWishes,
      differenceCountStarglitter: obj.countStarglitter - lastChange.countStarglitter,
    };
  }
  return {
    date: date,
    dateTime: dateTime,
    countPrimogems: obj.countPrimogems,
    countWishes: obj.countWishes,
    countStarglitter: obj.countStarglitter,
    differenceCountPrimogems: 0,
    differenceCountWishes: 0,
    differenceCountStarglitter: 0,
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
