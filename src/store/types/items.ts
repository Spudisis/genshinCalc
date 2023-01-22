export type storeItem = {
  id: number;
  name: string;
  date_start: string;
  date_end: string | undefined;
  valueDayByDay: number;
  countStart: number;
  countAdd: number;
  synchValue: number;
  image: string;
  imagePath: boolean;
  personId: number;
  createdAt: string;
  updatedAt: string;
};

export type checkPerson = {
  uid: string;
  dispatch: any;
};

export type primogems = {
  id: number;
  date: string;
  dateTime: string | undefined;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
  differenceCountPrimogems: number;
  differenceCountWishes: number;
  differenceCountStarglitter: number;
  personId: number;
  createdAt: string;
  updatedAt: string;
};

export type Synchronization = {
  id: number;

  name: string;
  value: number;
  typeValue: string;
};
export enum typeVal {
  "percent",
  "number",
}
