import { $authHost } from "./index";

export const getOnePrimogems = async (personId:number) => {
  const { data } = await $authHost.post("api/primogems/oneRow", {
    personId,
  });
  return data;
};
