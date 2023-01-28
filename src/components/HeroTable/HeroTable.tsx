import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addGemsItemStore } from "../../store/slices/heroes";
import { storeItem } from "../../store/types/items";
import { CalcBetween } from "../../utils";
import s from "./HeroTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateHero } from "../../api/heros";

export const Hero = React.memo(
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
    const dispatch = useAppDispatch();
    const initialCountPrimogems = useAppSelector((state) => state.primogemSlice.oneRow);

    const [obj, setObj] = React.useState({ betweenDays: 0, nowDays: 0, valueSave: 0, valueSum: 0, betweenSum: 0 });
    const [primogems, setPrimogems] = React.useState(0);
    const [countGemsPlus, setAddPrimogems] = React.useState(0);

    const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

    React.useEffect(() => {
      initialCountPrimogems.length !== 0 && setPrimogems(initialCountPrimogems[0].valuePrimogems);
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

    React.useEffect(() => {
      if (primogems && obj.valueSave) {
        setPrimogemsMinusSumm(primogems - obj.valueSave);
      }
    }, [primogems, obj.valueSave]);

    const handleChange = (e: any) => {
      const count = e.target.value;
      console.log(typeof +count);
      if (count) {
        setPrimogems(+count);
      } else {
        setPrimogems(0);
      }
    };
    const handleAdd = (e: any) => {
      const count = e.target.value;
      if (count) {
        setAddPrimogems(count);
      } else {
        setAddPrimogems(0);
      }
    };
    const sendAdd = (add: number) => {
      if (countGemsPlus) {
        let valueAdd = +add + +countGemsPlus;

        updateHero({ valueAdd, id }).then(() => dispatch(addGemsItemStore({ valueAdd, id })));
      }
    };
    return (
      <tr className={s.str}>
        {/* количество гемов */}
        <td>
          <input type="number" onChange={(e: any) => handleChange(e)} value={primogems} placeholder="Количество" />
        </td>
        {/* Сколько отложено */}
        <td>
          <p>{obj.valueSave}</p>
        </td>
        {/* отложено в круткха */}
        <td>
          <p>{obj.valueSum ? obj.valueSum : "0"}</p>
        </td>
        {/* Излишек */}
        <td>
          <p>{primogems && primogemsMinusSumm}</p>
        </td>

        {/* Излишек в крутках */}
        <td>
          <p>{primogemsMinusSumm >= 160 ? Math.floor(primogemsMinusSumm / 160) : "0"}</p>
        </td>

        {/* Сколько дней всего */}
        <td>
          <p>{obj.betweenDays ? obj.betweenDays : "Нет конечной даты"}</p>
        </td>

        {/* какой день накопления */}
        <td>
          <p>{obj.nowDays}</p>
        </td>
        {/* будет к концу */}
        <td>{obj.betweenSum ? obj.betweenSum : "Нет конечной даты"}</td>
        <td>
          <input type="number" onChange={(e) => handleAdd(e)} placeholder="Количество" />
          <button onClick={() => sendAdd(valueAdd)} disabled={countGemsPlus ? false : true}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
        </td>
      </tr>
    );
  }
);
