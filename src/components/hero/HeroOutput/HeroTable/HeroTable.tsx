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
    initialCountPrimogems.length !== 0 && setPrimogems(initialCountPrimogems[0].countPrimogems);
  }, [initialCountPrimogems]);

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
      {/* ???????????????????? ?????????? */}
      <td>
        <input type="number" onChange={(e: any) => handleChange(e)} value={primogems} placeholder="????????????????????" />
      </td>
      {/* ?????????????? ???????????????? */}
      <td>
        <p>{obj.countSave}</p>
      </td>
      {/* ???????????????? ?? ?????????????? */}
      <td>
        <p>{obj.countSumm ? obj.countSumm : "0"}</p>
      </td>
      {/* ?????????????? */}
      <td>
        <p>{primogems && primogemsMinusSumm}</p>
      </td>

      {/* ?????????????? ?? ?????????????? */}
      <td>
        <p>{primogemsMinusSumm >= 160 ? Math.floor(primogemsMinusSumm / 160) : "0"}</p>
      </td>

      {/* ?????????????? ???????? ?????????? */}
      <td>
        <p>{obj.between ? obj.between : "?????? ???????????????? ????????"}</p>
      </td>

      {/* ?????????? ???????? ???????????????????? */}
      <td>
        <p>{obj.now}</p>
      </td>
      {/* ?????????? ?? ?????????? */}
      <td>{obj.betweenSumm ? obj.betweenSumm : "?????? ???????????????? ????????"}</td>
      <td>
        <input type="number" onChange={(e) => handleAdd(e)} placeholder="????????????????????" />
        <button onClick={() => sendAdd()} disabled={countGemsPlus ? false : true}>
          <FontAwesomeIcon icon={faCheck as IconProp} />
        </button>
      </td>
    </tr>
  );
});
