import { useSelector } from "react-redux";

import { HeroList } from "../../components/hero/HeroList/HeroList";

import { useAppSelector } from "../../store/hooks";

export const Main = () => {
  const uid = useAppSelector((store) => store.person.id);

  return <div>{uid && <HeroList />}</div>;
};
