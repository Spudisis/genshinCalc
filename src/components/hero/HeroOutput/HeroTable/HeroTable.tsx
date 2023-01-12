import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeStore } from "../../../../store/slices/person";
import { storeItem } from "../../../../store/types/items";
import { CalcBetween } from "../../../../utils/calcItem";
import s from "./HeroTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export const Hero = React.memo(({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  const dispatch = useAppDispatch();
  const initialCountPrimogems = useAppSelector((state) => state.person.primogems);

  const [obj, setObj] = React.useState({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
  const [primogems, setPrimogems] = React.useState(0);
  const [countGemsPlus, setAddPrimogems] = React.useState(0);

  const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

  React.useEffect(() => {
    setPrimogems(initialCountPrimogems[0].countPrimogems);
  }, []);

  React.useEffect(() => {
    const count = CalcBetween({ id, dateStart, dateEnd, countStart, countPrimogems, image });
    if (count) {
      setObj(count);
    }
  }, [id, dateStart, dateEnd, countStart, countPrimogems, image, primogems]);

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
      dispatch(changeStore({ countGemsPlus, id }));
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
});
