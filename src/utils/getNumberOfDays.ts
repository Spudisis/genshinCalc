import { betweenDate } from "../store/types/calc";

export const getNumberOfDays = ({ date_start, date_end }: betweenDate) => {
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;

  const start_date = new LocalDate.parse(date_start);
  const end_date = new LocalDate.parse(date_end);

  const count = JSJoda.ChronoUnit.DAYS.between(start_date, end_date);
  return count;
};
