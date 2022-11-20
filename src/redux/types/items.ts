export type storeItem = {
  id: number;
  dateStart: string;
  dateEnd: string | undefined;
  countPrimogems: number;
  countStart: number;
  image: string;
};

export type checkPerson = {
  uid: string;
  dispatch: any;
};
