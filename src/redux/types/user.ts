import { storeItem } from "./items";

export type user = {
  email: string;
  password: string;
};


export type userSlice = {
  uid: string;
  store: storeItem[];
};

