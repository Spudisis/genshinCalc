import { setStore, setPrimogems } from "../../store/slices/person";

export const getUserState = ({ docs, docsPrimogems, dispatch }: any) => {
  const data = docs.data();

  const store = data?.store;
  const primogems = data?.primogems;
  console.log(primogems);
  if (Object.keys(store).length !== 0) {
    dispatch(setStore(store));
  }
  if (Object.keys(primogems).length !== 0) {
    dispatch(setPrimogems(primogems));
  }
};
