import React from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const UploadImg = async ({ objImg, uid }: any) => {
  console.log(objImg, objImg.name);

  if (objImg) {
    const imageRef = ref(storage, `images/${uid}/${objImg.name}`);
    uploadBytes(imageRef, objImg).then((snaphsot) => {
      //   getDownloadURL(snaphsot.ref)
    });
  }
};
