import React from "react";
import { createPrimogems } from "../../api/primogems";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPrimogems, setOneRow } from "../../store/slices/primogems";
import { primogems } from "../../store/types/items";
import { calcChangePrimogems } from "../../utils";
import { AddPrimogemsView } from "./AddPrimogemsView";

export type objForm = {
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
};

export const AddPrimogems = () => {
  const { uid } = useAppSelector((state) => state.person);
  const row = useAppSelector((state) => state.primogemSlice.oneRow);

  const fill = useAppSelector((store) => store.persistedReducer.params);
  const dispatch = useAppDispatch();

  const [primogemsCount, setPrimogemsCount] = React.useState(0);
  const [wishCount, setWishCount] = React.useState(0);
  const [starglitterCount, setStarglitterCount] = React.useState(0);

  React.useLayoutEffect(() => {
    if (fill.autoFill && row[0]) {
      setPrimogemsCount(row[0].countPrimogems);
      setWishCount(row[0].countWishes);
      setStarglitterCount(row[0].countStarglitter);
    } else {
      setPrimogemsCount(0);
      setWishCount(0);
      setStarglitterCount(0);
    }
  }, [fill.autoFill, row]);

  const calcPrimogems = async (obj: objForm) => {
    const objectFull = calcChangePrimogems(obj, row);
    try {
      const data: primogems = await createPrimogems(objectFull, Number(uid));

      dispatch(addPrimogems(data));

      dispatch(setOneRow([data]));
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
