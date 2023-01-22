import { $host } from "./index";

export const createHero = async (formData: any) => {
  const { data } = await $host.post("api/heros/", formData);
  return data;
};

export const getHeros = async (personId: any) => {
  const { data } = await $host.post("api/heros/allHeros", { personId });
  return data;
};
export const getOneHero = async (personId: any, id: any) => {
  const { data } = await $host.post("api/heros/" + id, { personId });
  return data;
};

export const updateHero = async (obj: any) => {
  const { data } = await $host.post("api/heros/hero/update", obj);
  console.log(data);
  return data;
};

export const deleteHero = async (uid: any, id: any) => {
  const { data } = await $host.post("api/heros/delete/" + id, { personId: uid });
  return data;
};
