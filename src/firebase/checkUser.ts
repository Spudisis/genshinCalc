import React from "react";
import { checkPerson } from "../redux/types/items";
import { firestore } from "./config";
import { CreateUser } from "./create/createUser";
import { getUserState } from "./get/getUserState";
export const CheckUser = async ({ uid, dispatch }: checkPerson) => {
  const check = firestore.collection("userStore").doc(uid);
  const docs = await check.get();
  
  if (docs.exists) {
    getUserState({ docs, dispatch });
  } else {
    CreateUser({ check, uid });
  }
};
