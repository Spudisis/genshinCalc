import React from "react";
import { deleteHero } from "../../../../api/heros";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteStore } from "../../../../store/slices/person";
import { deleteSynchroName } from "../../../../store/slices/synchronization";

import { ActionsView } from "./ActionsView";

interface ActionsTypes {
  id: number;
  name: string;
  image: string;
  uid: string;
}

export const Actions = ({ id, name, image, uid }: ActionsTypes) => {
  const [deleteItem, setDeleteItem] = React.useState(false);
  const dispatch = useAppDispatch();
  const synchronization = useAppSelector((store) => store.syncSlice.synchro);
  const deleteCart = async () => {
    synchronization.forEach((elem) => {
      elem.name === name && dispatch(deleteSynchroName(name));
    });
    setDeleteItem(false);
    deleteHero(uid, id).then((data) => {
      console.log(data)
      dispatch(deleteStore(id));
    });
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
