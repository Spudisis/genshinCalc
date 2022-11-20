import React from "react";
import { useSelector } from "react-redux";
import { CreateHero } from "../../components/hero/CreateHero/CreateHero";
import { HeroList } from "../../components/hero/HeroList/HeroList";
import { Hero } from "../../components/hero/HeroOutput/HeroTable";
import { getPerson } from "../../redux/slices/person";
import { storeItem } from "../../redux/types/items";
import s from "./main.module.scss";
export const Main = () => {
  const { uid } = useSelector(getPerson);
  return (
    <div className={s.root}>
      {uid && <CreateHero />}
      <HeroList />
    </div>
  );
};
