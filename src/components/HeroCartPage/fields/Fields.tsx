import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { addGemsItemStore } from "../../../store/slices/person";
import { storeItem } from "../../../store/types/items";


import { FieldsView } from "./FieldsView";

type Fields = {
  id: string;

  hero: storeItem;
};

export const Fields = ({ id, hero }: Fields) => {
  const dispatch = useAppDispatch();

  const addPrimogems = (id: number, countGemsPlus: number) => {
    console.log(id, countGemsPlus);
    dispatch(addGemsItemStore({ id, countGemsPlus }));
  };

  return (
    <>
      <FieldsView hero={hero} addPrimogems={addPrimogems} />
    </>
  );
};
