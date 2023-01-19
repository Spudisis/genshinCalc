import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addGemsItemStore, getPerson } from "../../../store/slices/person";
import { storeItem } from "../../../store/types/items";

import { CalcBetween } from "../../../utils";

import s from "./HeroCart.module.scss";

import { useSelector } from "react-redux";

import { Actions } from "./actions/actions";
import { ImageContain } from "./components/imageContain";
import { InputsCart } from "./components/inputsCart";
import { Info } from "./components/Info";
import { useLocation } from "react-router-dom";
import { Site } from "../../../const/routes";
import { obj } from "../../../store/slices/calcPrimogemObj";

export const HeroCart = React.memo(
  ({ id, name, dateStart, dateEnd, countStart, countAdd, countPrimogems, image, synchValue }: storeItem) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const actionView = location.pathname !== "/" + Site && location.pathname !== "/" + Site.slice(0, Site.length - 1);

    const { uid } = useSelector(getPerson);
    const initialCountPrimogems = useAppSelector((state) => state.primogemSlice.primogems);

    const [obj, setObj] = React.useState<obj>({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
    const [primogems, setPrimogems] = React.useState(0);
    const [countGemsPlus, setAddPrimogems] = React.useState(0);
    const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

    const [imageFirebase, setImageFirebase] = React.useState(false); //проверка, изображение с файрбейза или нет

    React.useLayoutEffect(() => {
      if (initialCountPrimogems.length !== 0) setPrimogems(initialCountPrimogems[0].countPrimogems);
    }, [initialCountPrimogems]);

    React.useLayoutEffect(() => {
      //рассчет примогемов
      const count = CalcBetween({
        id,
        name,
        dateStart,
        dateEnd,
        countAdd,
        countStart,
        countPrimogems,
        image,
        synchValue,
      });
      if (count) {
        setObj(count);
      }
    }, [id, dateStart, dateEnd, countStart, countPrimogems, countAdd, image, primogems]);

    React.useLayoutEffect(() => {
      if (primogems && obj.countSave) {
        setPrimogemsMinusSumm(primogems - obj.countSave);
      }
    }, [primogems, initialCountPrimogems]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const count = e.currentTarget.value;
      if (count) {
        setPrimogems(+count);
      } else {
        setPrimogems(0);
      }
    };
    const handleAdd = (e: React.FormEvent<HTMLInputElement>) => {
      const count = e.currentTarget.value;
      if (count) {
        setAddPrimogems(+count);
      } else {
        setAddPrimogems(0);
      }
    };
    const sendAdd = () => {
      if (countGemsPlus) {
        dispatch(addGemsItemStore({ countGemsPlus, id }));
      }
    };

    return (
      <div className={s.item}>
        <div className={s.info}>
          <div className={s.mainInfoCart}>
            <div className={s.imageContain}>
              <ImageContain setImageFirebase={setImageFirebase} image={image} uid={uid} setSizeImg={undefined} />
            </div>
            <InputsCart
              initialCount={primogems}
              handleChange={handleChange}
              handleAdd={handleAdd}
              countGemsPlus={countGemsPlus}
              sendAdd={sendAdd}
            />
          </div>
          <Info
            obj={obj}
            primogems={primogems}
            primogemsMinusSumm={primogemsMinusSumm}
            initialCountPrimogems={initialCountPrimogems.length !== 0 ? initialCountPrimogems[0].countWishes : 0}
          />
        </div>
        {actionView && (
          <Actions
            imageFirebase={imageFirebase}
            setImageFirebase={(n: boolean) => setImageFirebase(n)}
            id={id}
            name={name}
            image={image}
            uid={uid}
          />
        )}
      </div>
    );
  }
);
