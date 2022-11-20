import React from "react";
import { useSelector } from "react-redux";
import { CreateHero } from "../../components/CreateHero/CreateHero";
import { HeroList } from "../../components/CreateHero/HeroList";
import { Hero } from "../../components/HeroOutput/HeroTable";
import { getPerson } from "../../redux/slices/person";
import { storeItem } from "../../redux/types/items";
import s from "./main.module.scss";
export const Main = () => {
  const { store } = useSelector(getPerson);
  return (
    <div className={s.root}>
      <CreateHero />
      <HeroList />
    </div>
  );
};
