import { storage } from "../config";
import { ref, uploadBytes } from "firebase/storage";

export const UploadImg = async ({ objImg, uid }: any) => {
  console.log(objImg, objImg.name);

  if (objImg) {
    const imageRef = ref(storage, `images/${uid}/${objImg.name}`);
    await uploadBytes(imageRef, objImg).then(() => {});
    console.log("это бля сначала");
  }
};