import axios from "axios";
import { $authHost } from "../../../api";
import { viewSync } from "../components/List/List";

export const getSynchronization = async (id: number) => {
  const res = await $authHost.post("api/sync/all", { personId: id });
  return res;
};

export const editSynchronization = async ({ id, value, typeValue }: viewSync) => {
  const res = await $authHost.post("api/sync/edit", { id, value, typeValue });
  return res;
};
