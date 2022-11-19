import { setStore } from "../../redux/slices/person";

export const getUserState = ({ docs, dispatch }: any) => {
  const data = docs.data();
  const store = data?.store;
  if (Object.keys(store).length !== 0) {
    dispatch(setStore(store));
  }
};
