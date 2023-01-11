import React from "react";
import { User } from "../../store/types/user";
import { firestore } from "../config";

export const UpdateStore = ({ uid, store, primogems }: User) => {
  const check = firestore.collection("userStore").doc(uid);
  check.update({ store: store, primogems: primogems });
};
