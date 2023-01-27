import { $authHost } from "./index";

export const getPrimogems = async ({ uid, pageNumberNow, countLine }: any) => {
  const { data } = await $authHost.post("api/primogems/rows", {
    personId: uid,
    offset: pageNumberNow + 1,
    limit: countLine,
  });
  return data;
};
export const getOnePrimogems = async (uid: any) => {
  const { data } = await $authHost.post("api/primogems/oneRow", {
    personId: uid,
  });
  return data;
};
