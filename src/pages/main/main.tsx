import { HeroList } from "../../modules/ListHeroes/index";

import { useAppSelector } from "../../store/hooks";

export const Main = () => {
  return (
    <div>
      <HeroList />
    </div>
  );
};
