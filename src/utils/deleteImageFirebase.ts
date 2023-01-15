import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

type deleteImage = {
  uid: any;
  image: String;
};

export const deleteImageFirebase = async ({ uid, image }: deleteImage) => {
  const deleteRef = ref(storage, `images/${uid}/${image}`);
  await deleteObject(deleteRef)
    .then(() => {
      console.log("удалено");
    })
    .catch((error) => {
      console.log("ошибка");
    });
};
