import React from "react";
import { createPrimogems } from "../../Api/AddPtimogems";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addPrimogems, setOneRow } from "../../../../store/slices/primogems";
import { primogems } from "../../../../store/types/items";

import { calcChangePrimogems } from "../../../../utils";
import { objectFull } from "../../../../utils/calcChangePrimogems";

import { AddPrimogemsView } from "../AddPrimogemsView/AddPrimogemsView";
import { valuesForm } from "../FormAdd/formAdd";

export const AddPrimogems = () => {
  const id = useAppSelector((state) => state.person.id);
  const row = useAppSelector((state) => state.primogemSlice.oneRow);

  const fill = useAppSelector((store) => store.persistedReducer.params);
  const dispatch = useAppDispatch();

  const [primogemsCount, setPrimogemsCount] = React.useState(0);
  const [wishCount, setWishCount] = React.useState(0);
  const [starglitterCount, setStarglitterCount] = React.useState(0);

  React.useLayoutEffect(() => {
    if (fill.autoFill && row[0]) {
      setPrimogemsCount(row[0].valuePrimogems);
      setWishCount(row[0].valueWishes);
      setStarglitterCount(row[0].valueStarglitter);
    } else {
      setPrimogemsCount(0);
      setWishCount(0);
      setStarglitterCount(0);
    }
  }, [fill.autoFill, row]);

  const calcPrimogems = async (obj: valuesForm) => {
    const objectFull: objectFull = calcChangePrimogems(obj, row);

    try {
      const data: primogems = await createPrimogems(objectFull, id);
      console.log(data);
      dispatch(setOneRow([data]));
      dispatch(addPrimogems(data));
    } catch (e: any) {}
  };

  return (
    <AddPrimogemsView
      calcPrimogems={calcPrimogems}
      primogemsCount={primogemsCount}
      wishCount={wishCount}
      starglitterCount={starglitterCount}
    />
  );
};
