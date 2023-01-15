export type storeItem = {
  id: number;
  nameHero: string;
  dateStart: string;
  dateEnd: string | undefined;
  countPrimogems: number;
  countStart: number;
  synchValue: number;
  image: string;
};

export type checkPerson = {
  uid: string;
  dispatch: any;
};

export type primogems = {
  id: number;
  date: string;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
  differenceCountPrimogems: number;
  differenceCountWishes: number;
  differenceCountStarglitter: number;
};
