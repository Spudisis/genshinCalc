import { $authHost } from "../../../api";
import { valueDayByDay } from "../../../store/types/items";

export const addDBD = async (heroId: number, date_start: string) => {
  const { data } = await $authHost.post("api/dbd/create", { heroId, date_start, date_end: date_start });
  console.log(data);
  return data;
};
export const deleteDBD = async (id: number) => {
  const { data } = await $authHost.post("api/dbd/delete", { id });
  return data;
};
export const changeDBD = async (obj: valueDayByDay) => {
  const { data } = await $authHost.post("api/dbd/change", obj);
  return data;
};
