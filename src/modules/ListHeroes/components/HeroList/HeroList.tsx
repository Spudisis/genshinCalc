import React from "react";

import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setStore } from "../../../../store/slices/heroes";
import { findLocalStorage } from "../../../../utils";
import { getHeroes } from "../../Api/HeroesApi";

import { HeroListView } from "./HeroListView";
import { Site, waiting } from "../../../../const/routes";
export const HeroList = () => {
  const location = useLocation();
  const typeLocal = findLocalStorage("typeView");

  const id = useAppSelector((store) => store.person.id);
  const store = useAppSelector((store) => store.heroes.heroes);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const getHerosAll = async () => {
      const res = await getHeroes(id);
      dispatch(setStore(res));
    };
    getHerosAll();
  }, [dispatch, id]);

  const [typeView, setTypeView] = React.useState(typeLocal[1]);

  const setLocalStorage = (boolean: boolean) => {
    setTypeView(boolean);
    localStorage.setItem("typeView", JSON.stringify(boolean));
  };

  React.useEffect(() => {
    !typeLocal[0] && localStorage.setItem("typeView", JSON.stringify(typeView));
  }, [typeLocal, typeView]);

  return (
    <>
      {id && (
        <HeroListView
          store={store}
          setTypeView={setLocalStorage}
          typeView={typeView}
          locationWaitingPage={Site + waiting === location.pathname}
        />
      )}
    </>
  );
};
