export type storeItem = {
  id: number;
  date_start: string;
  date_end: string | undefined;
  name: string;
  image: string;
  imagePath: boolean;
  valueStart: number;
  valueAdd: number;
  valueWishes: number;
  createdAt: string;
  updatedAt: string;
  personId: number;
  SynchronizationId: number;
  Synchronization: Synchronization;
  valueDayByDays: valueDayByDay[];
  synchValue: number;
};

export type checkPerson = {
  uid: string;
  dispatch: any;
};

export type primogems = {
  id: number;
  date: string;
  dateTime: string | undefined;
  valuePrimogems: number;
  valueWishes: number;
  valueStarglitter: number;
  differenceValuePrimogems: number;
  differenceValueWishes: number;
  differenceValueStarglitter: number;
  personId: number;
  createdAt: string;
  updatedAt: string;
};

export type Synchronization = {
  id: number;
  name: string;
  value: number;
  res: number;
  typeValue: string | null;
  createdAt: string;
  updatedAt: string;
  personId: number;
};

export type valueDayByDay = {
  id: number;
  value: number;
  date_start: string;
  date_end: string | undefined;
};

export enum typeVal {
  "percent",
  "number",
}
