import React from "react";

export const getNumberDaysNow = (dateStart: string) => {
  const JSJoda = require("@js-joda/core");
  let LocalDate = JSJoda.LocalDate;

  const start_date = new LocalDate.parse(dateStart);
  const count = JSJoda.ChronoUnit.DAYS.between(start_date, LocalDate.now());
  return count;
};
