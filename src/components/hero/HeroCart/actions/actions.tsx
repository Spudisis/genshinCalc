import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteStore } from "../../../../store/slices/person";
import { deleteSynchroName } from "../../../../store/slices/synchronization";
import { deleteImageFirebase } from "../../../../utils";
import { ActionsView } from "./ActionsView";

interface ActionsTypes {
  imageFirebase: boolean;
  setImageFirebase: (n: boolean) => void;
  id: number;
  name: string;
  image: string;
  uid: string;
}

export const Actions = ({ imageFirebase, setImageFirebase, id, name, image, uid }: ActionsTypes) => {
  const [deleteItem, setDeleteItem] = React.useState(false);
  const dispatch = useAppDispatch();
  const synchronization = useAppSelector((store) => store.syncSlice.synchro);
  const deleteCart = async () => {
    synchronization.forEach((elem) => {
      elem.name === name && dispatch(deleteSynchroName(name));
    });
    setDeleteItem(false);
    imageFirebase && (await deleteImageFirebase({ uid, image }));
    console.log(id, image, imageFirebase);
    setImageFirebase(false);
    dispatch(deleteStore(id));
  };

  return (
    <ActionsView
      deleteCart={() => deleteCart()}
      setDeleteItem={(n: boolean) => setDeleteItem(n)}
      deleteItem={deleteItem}
      id={id}
    />
  );
};
