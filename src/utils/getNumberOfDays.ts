import { betweenDate } from "../store/types/calc";

export const getNumberOfDays = ({ dateStart, dateEnd }: betweenDate) => {
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;

  const start_date = new LocalDate.parse(dateStart);
  const end_date = new LocalDate.parse(dateEnd);

  const count = JSJoda.ChronoUnit.DAYS.between(start_date, end_date);
  return count;
};
