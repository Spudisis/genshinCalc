import { counterPrim, Site, waiting } from "../../../../const/routes";
import { ButtonPage } from "../../../../UI/ButtonPage/ButtonPage";
import s from "./Links.module.scss";
export const Links = () => {
  return (
    <div className={s.root}>
      <ButtonPage url={Site + waiting} namePage={"Ждем персонажа"} />
      <ButtonPage url={Site + counterPrim} namePage={"Счетчик примогемов"} />
    </div>
  );
};
