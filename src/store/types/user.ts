import { primogems, storeItem } from "./items";

export type user = {
  email: string;
  password: string;
};
export type personSlice = {
  uid: string;
  store: storeItem[];
  primogems: primogems[];
};
