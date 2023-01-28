import { copy } from "../components/PrimoHistory/PrimoHistory";
import { getDateNow } from "../../../utils/calcChangePrimogems";

export const copyClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter, index }: copy) => {
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
