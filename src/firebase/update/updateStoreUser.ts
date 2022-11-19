import React from "react";
import { userSlice } from "../../redux/types/user";
import { firestore } from "../config";

export const UpdateStore = ({ uid, store }: userSlice) => {
  const check = firestore.collection("userStore").doc(uid);
  check.update({ store: store });
};
