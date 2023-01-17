import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addGemsItemStore } from "../../../store/slices/person";
import { storeItem } from "../../../store/types/items";
import { CalcBetween } from "../../../utils";
import s from "./HeroTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export const Hero = React.memo(
  ({ id, name, dateStart, dateEnd, countStart, countPrimogems, countAdd, image, synchValue }: storeItem) => {
    const dispatch = useAppDispatch();
    const initialCountPrimogems = useAppSelector((state) => state.person.primogems);

    const [obj, setObj] = React.useState({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
    const [primogems, setPrimogems] = React.useState(0);
    const [countGemsPlus, setAddPrimogems] = React.useState(0);

    const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

    React.useEffect(() => {
      initialCountPrimogems.length !== 0 && setPrimogems(initialCountPrimogems[0].countPrimogems);
    }, [initialCountPrimogems]);

    React.useEffect(() => {
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
    }, [id, dateStart, dateEnd, countStart, countPrimogems, image, countAdd, primogems]);

    React.useEffect(() => {
      if (primogems && obj.countSave) {
        setPrimogemsMinusSumm(primogems - obj.countSave);
      }
    }, [primogems]);

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
    const sendAdd = () => {
      if (countGemsPlus) {
        dispatch(addGemsItemStore({ countGemsPlus, id }));
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
          <p>{obj.countSave}</p>
        </td>
        {/* отложено в круткха */}
        <td>
          <p>{obj.countSumm ? obj.countSumm : "0"}</p>
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
          <p>{obj.between ? obj.between : "Нет конечной даты"}</p>
        </td>

        {/* какой день накопления */}
        <td>
          <p>{obj.now}</p>
        </td>
        {/* будет к концу */}
        <td>{obj.betweenSumm ? obj.betweenSumm : "Нет конечной даты"}</td>
        <td>
          <input type="number" onChange={(e) => handleAdd(e)} placeholder="Количество" />
          <button onClick={() => sendAdd()} disabled={countGemsPlus ? false : true}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
        </td>
      </tr>
    );
  }
);
