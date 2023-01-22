import { $host } from "./index";

export const createPrimogems = async (
  {
    countPrimogems,
    countStarglitter,
    countWishes,
    differenceCountPrimogems,
    differenceCountStarglitter,
    differenceCountWishes,
    date,
    dateTime,
  }: any,
  uid: number
) => {
  const { data } = await $host.post("api/primogems/", {
    countPrimogems,
    countStarglitter,
    countWishes,
    differenceCountPrimogems,
    differenceCountStarglitter,
    differenceCountWishes,
    date,
    dateTime,
    personId: uid,
  });

  return data;
};

export const getPrimogems = async ({ uid, pageNumberNow, countLine }: any) => {
  const { data } = await $host.post("api/primogems/rows", {
    personId: uid,
    offset: pageNumberNow + 1,
    limit: countLine,
  });
  return data;
};
export const getOnePrimogems = async (uid: any) => {
  const { data } = await $host.post("api/primogems/oneRow", {
    personId: uid,
  });
  return data;
};
