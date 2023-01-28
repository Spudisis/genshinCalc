import { $authHost } from "../../../api";

export const getPrimogems = async ({ uid, pageNumberNow, countLine }: any) => {
  const { data } = await $authHost.post("api/primogems/rows", {
    personId: uid,
    offset: pageNumberNow + 1,
    limit: countLine,
  });
  return data;
};
