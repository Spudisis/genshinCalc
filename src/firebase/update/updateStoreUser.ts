import { allSlice } from "../../store/types/user";
import { firestore } from "../config";

export const UpdateStore = ({ uid, store, primogems, synchro }: allSlice) => {
  const check = firestore.collection("userStore").doc(uid);
  check.update({ store: store, primogems: primogems, synchro: synchro });
};
