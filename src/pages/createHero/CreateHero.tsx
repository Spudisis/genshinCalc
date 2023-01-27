import { HeroList } from "../../components/hero/HeroList/HeroList";
import { Info } from "./components/Info";
import s from "../style.module.scss";
import { useAppSelector } from "../../store/hooks";

export const CreateHero = () => {
  const id = useAppSelector((state) => state.person.id);
  return (
    <div className={s.root}>
      <Info />

      {id && <HeroList />}
    </div>
  );
};
