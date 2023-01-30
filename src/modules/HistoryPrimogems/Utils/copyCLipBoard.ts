import { Copy } from "../components/PrimoHistory/PrimoHistory";
import { getDateNow } from "../../../utils/calcChangePrimogems";

export const copyClipBoard = async ({ date, valuePrimogems, valueWishes, valueStarglitter, index }: Copy) => {
  let declination = "";

  if (index === 0 && date.slice(0, 10) === getDateNow()) {
    declination = "Сейчас у меня ";
  } else {
    declination = `${date} у меня было `;
  }
  await navigator.clipboard.writeText(
    `${declination} ${valuePrimogems} примогемов, ${valueWishes} круток и ${valueStarglitter} блеска`
  );
};