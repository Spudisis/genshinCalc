import React from "react";
import { useSelector } from "react-redux";
import { getPerson } from "../../../redux/slices/person";

import { HeroListView } from "./HeroListView";
export const HeroList = () => {
  const { store } = useSelector(getPerson);

  const [typeView, setTypeView] = React.useState(false);

  return <HeroListView store={store} setTypeView={(n: boolean) => setTypeView(n)} typeView={typeView} />;
};
