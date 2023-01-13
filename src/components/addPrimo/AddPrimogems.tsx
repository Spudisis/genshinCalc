import React from "react";
import { useSelector } from "react-redux";
import { UpdateStore } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPrimogems, getPerson } from "../../store/slices/person";
import { calcChangePrimogems } from "../../utils";
import { AddPrimogemsView } from "./AddPrimogemsView";
import { setAutoFill as dispatchFill }  from "../../store/slices/localstorage";

export type objForm = {
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
};

export const AddPrimogems = () => {
  const { uid, primogems, store } = useAppSelector((state) => state.person);
  const fill = useAppSelector((store) => store.persistedReducer.params);
  const dispatch = useAppDispatch();

  const [autoFill, setAutoFill] = React.useState(fill.autoFill);

  const [primogemsCount, setPrimogemsCount] = React.useState(0);
  const [wishCount, setWishCount] = React.useState(0);
  const [starglitterCount, setStarglitterCount] = React.useState(0);

  React.useEffect(() => {
    if (autoFill && primogems[0]) {
      setPrimogemsCount(primogems[0].countPrimogems);
      setWishCount(primogems[0].countWishes);
      setStarglitterCount(primogems[0].countStarglitter);
    } else {
      setPrimogemsCount(0);
      setWishCount(0);
      setStarglitterCount(0);
    }
  }, [autoFill, primogems]);

  React.useEffect(() => {
    uid && primogems.length !== 0 && UpdateStore({ uid, store, primogems });
  }, [primogems]);

  const setLocalStorage = (boolean: boolean) => {
    setAutoFill(boolean);
    dispatch(dispatchFill(boolean));
  };

  const calcPrimogems = (obj: objForm) => {
    const objectFull = calcChangePrimogems(obj, primogems);
    dispatch(addPrimogems(objectFull));
  };

  return (
    <AddPrimogemsView
      calcPrimogems={calcPrimogems}
      setAutoFill={setLocalStorage}
      autoFill={autoFill}
      primogemsCount={primogemsCount}
      wishCount={wishCount}
      starglitterCount={starglitterCount}
    />
  );
};
