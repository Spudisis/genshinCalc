import React from "react";
import { useAppSelector } from "../../../store/hooks";

import { storeItem } from "../../../store/types/items";

import { CalcBetween } from "../../../utils";

import s from "./HeroCart.module.scss";

import { Actions } from "./actions/actions";
import { ImageContain } from "./components/imageContain";
import { InputsCart } from "./components/inputsCart";
import { Info } from "./components/Info";
import { useLocation } from "react-router-dom";
import { Site } from "../../../const/routes";
import { obj } from "../../../store/slices/calcPrimogemObj";

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
    synchValue,
  }: storeItem) => {
    const location = useLocation();

    const actionView = location.pathname !== Site && location.pathname !== Site.slice(0, Site.length - 1);

    const idPerson = useAppSelector((store) => store.person.id);
    const initialCountPrimogems = useAppSelector((state) => state.primogemSlice.oneRow);

    const [obj, setObj] = React.useState<obj>({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
    const [primogems, setPrimogems] = React.useState(0);

    const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

    React.useLayoutEffect(() => {
      if (initialCountPrimogems.length !== 0) setPrimogems(initialCountPrimogems[0].valuePrimogems);
    }, [initialCountPrimogems]);

    React.useLayoutEffect(() => {
      // const count = CalcBetween({
      //   date_start,
      //   date_end,
      //   countStart,
      //   countAdd,
      //   valueDayByDay,
      //   synchValue,
      // });
      // if (count) {
      //   setObj(count);
      // }
    }, [date_start, date_end, valueStart, valueAdd, valueDayByDays, synchValue]);

    React.useLayoutEffect(() => {
      if (primogems && obj.countSave) {
        setPrimogemsMinusSumm(primogems - obj.countSave);
      }
    }, [primogems, obj.countSave]);

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
