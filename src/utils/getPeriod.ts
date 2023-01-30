import { getDateNow } from "./calcChangePrimogems";
import { getNumberOfDays } from "./getNumberOfDays";

const between = (date_start: string, date_end: string) => {
  return getNumberOfDays({ date_start, date_end }) + 1;
};
const calcStart = (start: string) => {
  const date_start = start;
  const date_end = getDateNow();
  return getNumberOfDays({ date_start, date_end });
}; //сколько дней прошло со старта

const calcEnd = (end: string) => {
  const date_end = end;
  if (date_end) {
    const date_start = getDateNow();
    return getNumberOfDays({ date_start, date_end });
  }
}; //сколько дней прошло с окончания

export const getPeriodDays = (start: string, end: string | undefined) => {
  const firstDelay = calcStart(start);

  // если нет даты конца
  if (end === undefined || end === "") {
    if (firstDelay === 0) {
      return 1;
    }
    if (firstDelay < 0) {
      console.log(0);
      return 0;
    }
    if (firstDelay > 0) {
      return firstDelay + 1;
    }
  } else {
    const secondDelay = calcEnd(end);
    if (firstDelay >= 0 && secondDelay >= 0) {
      return between(start, end);
    }
    if (firstDelay >= 0 && secondDelay < 0) {
      return between(start, end);
    }
  }
};
