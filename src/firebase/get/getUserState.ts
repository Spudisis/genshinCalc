import { setPrivilege, setStore } from "../../store/slices/person";
import { setPrimogems } from "../../store/slices/primogems";
import { setSynchro } from "../../store/slices/synchronization";

export const getUserState = ({ docs, dispatch }: any) => {
  const data = docs.data();

  const store = data?.store;
  const primogems = data?.primogems;
  const synchro = data?.synchro;
  const statusUser = data?.privilege || "user";

  dispatch(setPrivilege(statusUser));
  if (Object.keys(store).length !== 0) {
    dispatch(setStore(store));
  }
  if (Object.keys(primogems).length !== 0) {
    dispatch(setPrimogems(primogems));
  }
  if (Object.keys(synchro).length !== 0) {
    dispatch(setSynchro(synchro));
  }
};
