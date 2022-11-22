import { useSelector } from "react-redux";
import { CreateHero } from "../../components/hero/CreateHero/CreateHero";
import { HeroList } from "../../components/hero/HeroList/HeroList";

import { getPerson } from "../../redux/slices/person";

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
