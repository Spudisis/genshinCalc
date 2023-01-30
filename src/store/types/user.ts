import { primogems, storeItem, Synchronization } from "./items";

export type user = {
  email: string;
  password: string;
};
export type personSlice = {
  uid: string;
  store: storeItem[];
};

export type primogemsSlice = {
  oneRow: primogems[];
  primogems: primogems[];
  count: number;
  statusLoading: status;
};

export type allSlice = {
  uid: string;
  store: storeItem[];
  primogems: primogems[];
  synchro: Synchronization[];
};

export type synchroSlice = {
  synchro: Synchronization[];
  statusSync: status;
};
export enum status {
  LOADING, REJECTED, FULFILLED
}