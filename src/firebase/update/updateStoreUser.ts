import React from "react";
import { personSlice } from "../../store/types/user";
import { firestore } from "../config";

export const UpdateStore = ({ uid, store, primogems }: personSlice) => {
  const check = firestore.collection("userStore").doc(uid);
  check.update({ store: store, primogems: primogems });
};
