import { useParams } from "react-router-dom";
import { PrimogemsViewCart } from "../../components";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { obj, setObj } from "../../store/slices/calcPrimogemObj";
import { storeItem } from "../../store/types/items";
import { CalcBetween } from "../../utils";
import { PositionImageFields } from "../../modules/Position_HeroPage";

export const HeroCart = () => {
  const params = useParams();
  const id = params.id!;
  const dispatch = useAppDispatch();

  const uid = useAppSelector((store) => store.person.id);
  const objectPrimogemsNewCalc = useAppSelector((state) => state.calcPrimogemObj.calculate);
  const [objPrimogems, setObjPrimogems] = React.useState<obj>();

  const [hero, setHero] = React.useState<storeItem>();
  React.useEffect(() => {
    if (hero) {
      const setObjHero = () => {
        const count = CalcBetween(hero);
        if (count) {
          dispatch(setObj(count));
        }
      };
      setObjHero();
    }
  }, [hero]);

  React.useEffect(() => {
    setObjPrimogems(objectPrimogemsNewCalc);
  }, [objectPrimogemsNewCalc]);

  return <div><PositionImageFields />{objPrimogems && <PrimogemsViewCart obj={objPrimogems} />}</div>;
};
