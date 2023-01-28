import React from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { obj, setObj } from "../../store/slices/calcPrimogemObj";
import { getOneHero } from "../../store/slices/heroes";
import { status } from "../../store/types/user";

import { CalcBetween } from "../../utils";

import { Fields } from "./Components/Fields/Fields";
import { Image } from "./Components/Image/Image";

import s from "./Position.module.scss";

export const PositionImageFields = () => {
  const params = useParams();
  const id = params.id!;
  const dispatch = useAppDispatch();

  const { oneHero, statusLoading } = useAppSelector((store) => store.heroes);

  const objectPrimogemsNewCalc = useAppSelector((state) => state.calcPrimogemObj.calculate);
  const personId: number = useAppSelector((store) => store.person.id);

  const [sizeImg, setSizeImg] = React.useState<[T: number, U: number]>([0, 0]);

  const [style, setStyle] = React.useState<string>("");
  const [objPrimogems, setObjPrimogems] = React.useState<obj>();

  React.useEffect(() => {
    if (statusLoading === status.FULFILLED && oneHero.id !== 0) {
      const setObjHero = () => {
        const count = CalcBetween(oneHero);
        if (count) {
          dispatch(setObj(count));
        }
      };
      setObjHero();
    }
  }, [oneHero, statusLoading]);

  React.useEffect(() => {
    dispatch(getOneHero({ id, personId }));
  }, [id, personId]);

  React.useEffect(() => {
    if (sizeImg[0] > sizeImg[1]) setStyle(s.vertically);
    if (sizeImg[0] < sizeImg[1]) setStyle(s.horizontally);
    if (sizeImg[0] === sizeImg[1]) setStyle("");
  }, [sizeImg]);

  React.useEffect(() => {
    setObjPrimogems(objectPrimogemsNewCalc);
  }, [objectPrimogemsNewCalc]);

  return (
    <>
      {statusLoading === status.FULFILLED && (
        <div className={style}>
          <Image id={id} setSizeImg={setSizeImg} image={oneHero.image} imagePath={oneHero.imagePath} />
          {objPrimogems && <Fields hero={oneHero} id={personId} />}
        </div>
      )}
    </>
  );
};
