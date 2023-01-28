import { getDateNow } from "./calcChangePrimogems";
import { getNumberOfDays } from "./getNumberOfDays";

export const getPeriodDays = (start: string, end: string) => {
  const calcStart = () => {
    const date_start = start;
    const date_end = getDateNow();
    return getNumberOfDays({ date_start, date_end });
  }; //сколько дней прошло со старта
  const calcEnd = () => {
    const date_end = end;
    if (date_end) {
      const date_start = getDateNow();
      return getNumberOfDays({ date_start, date_end });
    }
  }; //сколько дней прошло с окончания
  const firstDelay = calcStart();
  const secondDelay = calcEnd();

  if (firstDelay > 0 && secondDelay >= 0) {
    return between(start, end);
  }
  if (firstDelay > 0 && secondDelay < 0) {
    return between(start, end);
  }

  if (firstDelay < 0 && !secondDelay) {
    console.log(0);
    return 0;
  }
  if (firstDelay >= 0 && !secondDelay) {
    return between(start, end);
  }
  if (firstDelay === 0) {
    return 1;
  }
  if (firstDelay < 0) {
    console.log(0);
    return 0;
  }
};

const between = (date_start: string, date_end: string) => {
  return getNumberOfDays({ date_start, date_end }) + 1;
};
