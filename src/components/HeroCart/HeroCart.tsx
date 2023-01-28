import React from "react";
import { useAppSelector } from "../../store/hooks";

import { storeItem } from "../../store/types/items";

import { CalcBetween } from "../../utils";

import s from "./HeroCart.module.scss";

import { Actions } from "./actions/actions";
import { ImageContain } from "../ImageContain/imageContain";
import { InputsCart } from "./components/inputsCart";
import { Info } from "./components/Info";
import { useLocation } from "react-router-dom";
import { Site } from "../../const/routes";
import { obj } from "../../store/slices/calcPrimogemObj";

export const HeroCart = React.memo(
  ({
    id,
    date_start,
    date_end,
    name,
    image,
    imagePath,
    valueStart,
    valueAdd,
    valueWishes,
    createdAt,
    updatedAt,
    personId,
    SynchronizationId,
    Synchronization,
    valueDayByDays,
  }: storeItem) => {
    const location = useLocation();

    const actionView = location.pathname !== Site && location.pathname !== Site.slice(0, Site.length - 1);

    const idPerson = useAppSelector((store) => store.person.id);
    const initialCountPrimogems = useAppSelector((state) => state.primogemSlice.oneRow);

    const [obj, setObj] = React.useState<obj>({ betweenDays: 0, nowDays: 0, valueSave: 0, valueSum: 0, betweenSum: 0 });
    const [primogems, setPrimogems] = React.useState(0);

    const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

    React.useLayoutEffect(() => {
      if (initialCountPrimogems.length !== 0) setPrimogems(initialCountPrimogems[0].valuePrimogems);
    }, [initialCountPrimogems]);

    React.useLayoutEffect(() => {
      console.log(date_start, date_end, valueStart, valueAdd, valueDayByDays, Synchronization, valueWishes);
      const count = CalcBetween({
        date_start,
        date_end,
        valueStart,
        valueAdd,
        valueDayByDays,
        Synchronization,
        valueWishes,
      });
      if (count) {
        setObj(count);
      }
    }, [date_start, date_end, valueStart, valueAdd, valueDayByDays, Synchronization, valueWishes]);

    React.useLayoutEffect(() => {
      if (primogems && obj.valueSave) {
        setPrimogemsMinusSumm(primogems - obj.valueSave);
      }
    }, [primogems, obj.valueSave]);

    return (
      <div className={s.item}>
        <div className={s.info}>
          <div className={s.mainInfoCart}>
            <div className={s.imageContain}>
              <ImageContain image={image} imagePath={imagePath} uid={idPerson} setSizeImg={undefined} />
            </div>
            <InputsCart initialCount={primogems} setPrimogems={setPrimogems} add={valueAdd} id={idPerson} />
          </div>
          <Info
            obj={obj}
            primogems={primogems}
            primogemsMinusSumm={primogemsMinusSumm}
            initialCountPrimogems={initialCountPrimogems.length !== 0 ? initialCountPrimogems[0].valuePrimogems : 0}
          />
        </div>
        {actionView && <Actions id={id} name={name} image={image} idPerson={idPerson} />}
      </div>
    );
  }
);
