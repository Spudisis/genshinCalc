import { $authHost } from "../../../api";
import { objectFull } from "../../../utils/calcChangePrimogems";

export const createPrimogems = async (objectFull: objectFull, id: number) => {
  const {
    date,
    dateTime,
    valuePrimogems,
    valueWishes,
    valueStarglitter,
    differenceValuePrimogems,
    differenceValueWishes,
    differenceValueStarglitter,
  } = objectFull;
  const { data } = await $authHost.post("api/primogems/", {
    date,
    dateTime,
    valuePrimogems,
    valueWishes,
    valueStarglitter,
    differenceValuePrimogems,
    differenceValueWishes,
    differenceValueStarglitter,
    personId: id,
  });

  return data;
};
