import React from "react";
import { useSelector } from "react-redux";
import { UpdateStore } from "../../firebase";
import { useAppDispatch } from "../../store/hooks";
import { addPrimogems, getPerson } from "../../store/slices/person";
import { calcChangePrimogems } from "../../utils";
import { AddPrimogemsView } from "./AddPrimogemsView";

export type objForm = {
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
};

export const AddPrimogems = () => {
  const { uid, primogems, store } = useSelector(getPerson);
  const dispatch = useAppDispatch();

  const calcPrimogems = (obj: objForm) => {
    const objectFull = calcChangePrimogems(obj, primogems);
    dispatch(addPrimogems(objectFull));
  };

  React.useEffect(() => {
    uid && primogems.length !== 0 && UpdateStore({ uid, store, primogems });
  }, [primogems]);

  return <AddPrimogemsView calcPrimogems={calcPrimogems} />;
};
