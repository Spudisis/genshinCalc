import React from "react";

import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setStore } from "../../../store/slices/heroes";
import { findLocalStorage } from "../../../utils/";
import { getHeros } from "../../../api/heros";

import { HeroListView } from "./HeroListView";
export const HeroList = () => {
  const typeLocal = findLocalStorage("typeView");
  const uid = useAppSelector((store) => store.person.id);
  const store = useAppSelector((store) => store.heroes.heroes);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const getHerosAll = async () => {
      const res = await getHeros(uid);
      dispatch(setStore(res));
    };
    getHerosAll();
  }, [dispatch, uid]);
  const [typeView, setTypeView] = React.useState(typeLocal[1]);
  const location = useLocation();

  const setLocalStorage = (boolean: boolean) => {
    setTypeView(boolean);
    localStorage.setItem("typeView", JSON.stringify(boolean));
  };

  React.useEffect(() => {
    !typeLocal[0] && localStorage.setItem("typeView", JSON.stringify(typeView));
  }, [typeLocal, typeView]);

  return <HeroListView store={store} setTypeView={setLocalStorage} typeView={typeView} location={location.pathname} />;
};
