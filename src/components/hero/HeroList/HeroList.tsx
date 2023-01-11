import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPerson } from "../../../store/slices/person";

import { HeroListView } from "./HeroListView";
export const HeroList = () => {
  const { store } = useSelector(getPerson);

  const [typeView, setTypeView] = React.useState(false);
  const location = useLocation();
  return (
    <HeroListView
      store={store}
      setTypeView={(n: boolean) => setTypeView(n)}
      typeView={typeView}
      location={location.pathname}
    />
  );
};
