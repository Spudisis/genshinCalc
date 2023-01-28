import { $authHost } from "./index";

export const updateHero = async (obj: any) => {
  const { data } = await $authHost.post("api/heros/hero/update", obj);
  console.log(data);
  return data;
};

export const deleteHero = async (uid: any, id: any) => {
  const { data } = await $authHost.post("api/heros/delete/" + id, { personId: uid });
  return data;
};

export const getUsers = async (nickname: string) => {
  console.log(nickname);
  const { data } = await $authHost.post("api/person/users", { nickname });
  return data;
};
