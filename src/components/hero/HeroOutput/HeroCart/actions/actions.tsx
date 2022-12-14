import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { storage } from "../../../../../firebase/config";
import { useAppDispatch } from "../../../../../store/hooks";
import { deleteStore } from "../../../../../store/slices/person";
import { ActionsView } from "./ActionsView";

interface ActionsTypes {
  imageFirebase: boolean;
  setImageFirebase: (n: boolean) => void;
  id: number;
  image: string;
  uid: string;
}

export const Actions = ({ imageFirebase, setImageFirebase, id, image, uid }: ActionsTypes) => {
  const [deleteItem, setDeleteItem] = React.useState(false);
  const dispatch = useAppDispatch();
  const deleteCart = async () => {
    setDeleteItem(false);
    imageFirebase && (await deleteImageFirebase());
    console.log(id, image, imageFirebase);
    setImageFirebase(false);
    dispatch(deleteStore(id));
  };
  const deleteImageFirebase = async () => {
    const deleteRef = ref(storage, `images/${uid}/${image}`);
    await deleteObject(deleteRef)
      .then(() => {
        console.log("удалено");
      })
      .catch((error) => {
        console.log("ошибка");
      });
  };
  return (
    <ActionsView
      deleteCart={() => deleteCart()}
      setDeleteItem={(n: boolean) => setDeleteItem(n)}
      deleteItem={deleteItem}
    />
  );
};
