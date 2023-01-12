import { objForm } from "../components/addPrimo/AddPrimogems";
import { primogems } from "../store/types/items";

const checkTwoDigit = (number: number) => {
  return number < 10 ? "0" + number : number;
};

export const calcChangePrimogems = (
  obj: objForm,

  primogems: primogems[]
) => {
  const lastChange = primogems.length !== 0 && primogems[0];
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;
  let localTime = JSJoda.LocalTime;
  const timeNow = localTime.now();
  const dateNow = LocalDate.now();
  const date =
    dateNow.year() +
    "-" +
    checkTwoDigit(dateNow.monthValue()) +
    "-" +
    checkTwoDigit(dateNow.dayOfMonth()) +
    " " +
    checkTwoDigit(timeNow.hour()) +
    ":" +
    checkTwoDigit(timeNow.minute()) +
    ":" +
    checkTwoDigit(timeNow.second());

  if (lastChange) {
    return {
      id: Math.random(),
      date: date,
      countPrimogems: obj.countPrimogems,
      countWishes: obj.countWishes,
      countStarglitter: obj.countStarglitter,
      differenceCountPrimogems: obj.countPrimogems - lastChange.countPrimogems,
      differenceCountWishes: obj.countWishes - lastChange.countWishes,
      differenceCountStarglitter: obj.countStarglitter - lastChange.countStarglitter,
    };
  }
  return {
    id: Math.random(),
    date: date,
    countPrimogems: obj.countPrimogems,
    countWishes: obj.countWishes,
    countStarglitter: obj.countStarglitter,
    differenceCountPrimogems: 0,
    differenceCountWishes: 0,
    differenceCountStarglitter: 0,
  };
};
