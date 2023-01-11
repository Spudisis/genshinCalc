import { objForm } from "../components/addPrimo/AddPrimogems";
import { primogems } from "../store/types/items";

export const calcChangePrimogems = (
  obj: objForm,

  primogems: primogems[]
) => {
  const lastChange = primogems.length !== 0 && primogems[0];
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;
  const dateNow = LocalDate.now();
  const date =
    dateNow.year() +
    "-" +
    (dateNow.monthValue() < 10 ? "0" + dateNow.monthValue() : dateNow.monthValue()) +
    "-" +
    dateNow.dayOfMonth();

  console.log(date);
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
