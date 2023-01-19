import React from "react";
import { useSelector } from "react-redux";
import { HeroList } from "../../components/hero/HeroList/HeroList";
import { getPerson } from "../../store/slices/person";
import { Info } from "./components/Info";
import s from "../style.module.scss";
import { useAppSelector } from "../../store/hooks";
export const CreateHero = () => {
  const uid = useAppSelector((state) => state.person.uid);
  return (
    <div className={s.root}>
      <Info />
      
      {uid && <HeroList />}
    </div>
  );
};
