import React from "react";
import { deleteHero } from "../../../../api/heros";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteStore } from "../../../../store/slices/heroes";

import { ActionsView } from "./ActionsView";

interface ActionsTypes {
  id: number;
  name: string;
  image: string;
  idPerson: number;
}

export const Actions = ({ id, name, image, idPerson }: ActionsTypes) => {
  const [deleteItem, setDeleteItem] = React.useState(false);
  const dispatch = useAppDispatch();

  const deleteCart = async () => {
    setDeleteItem(false);
    deleteHero(idPerson, id).then((data) => {
      console.log(data);
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
