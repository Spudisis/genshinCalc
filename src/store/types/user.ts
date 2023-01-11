import { primogems, storeItem } from "./items";

export type user = {
  email: string;
  password: string;
};
export type User = {
  uid: string;
  store: storeItem[];
  primogems: primogems[];
};

export type userSlice = {
  uid: string;
  store: storeItem[];
};

export type userPrimogems = {
  uid: string;
  primogems: primogems[];
};
