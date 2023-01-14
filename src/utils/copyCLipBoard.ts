import { copy } from "../components/primoHistory/PrimoHistory";
import { getDateNow } from "./calcChangePrimogems";

export const copyClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter, index }: copy) => {
  console.log(index);
  let declination = "";

  if (index === 0 && date.slice(0, 10) === getDateNow()) {
    declination = "Сейчас у меня ";
  } else {
    declination = `${date} у меня было `;
  }
  await navigator.clipboard.writeText(
    `${declination} ${countPrimogems} примогемов, ${countWishes} круток и ${countStarglitter} блеска`
  );
};
