import { $authHost } from "../../../api";

export const getHeroes = async (personId: any) => {
  const { data } = await $authHost.post("api/heros/allHeros", { personId });
  return data;
};
export const createHero = async (formData: any) => {
  const { data } = await $authHost.post("api/heros/", formData);
  return data;
};
