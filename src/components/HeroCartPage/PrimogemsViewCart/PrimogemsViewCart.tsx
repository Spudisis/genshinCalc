import React from "react";
import { obj } from "../../../store/slices/calcPrimogemObj";
import s from "./primogemsViewCart.module.scss";
type cartPrimogem = {
  obj: obj;
};

export const PrimogemsViewCart = ({ obj }: cartPrimogem) => {
  return (
    <div className={s.wrapper}>
      <div>
        <p>День накопления:</p> {obj.now}
      </div>
      <div>
        <p>Дней между начальной и конечной датой: </p>
        {obj.between}
      </div>
      <div>
        <p>Предварительное кол-во гемов за промежуток: </p>
        {obj.betweenSumm}
      </div>
      {obj.betweenSumm !== 0 && (
        <div className={s.wish}>
          <p>Предварительное кол-во в крутках: </p>
          {Math.ceil(obj.betweenSumm / 160)}
        </div>
      )}
      <div>
        <p>Количество накопленных примогемов: </p>
        {obj.countSave}
      </div>
      <div className={s.wish}>
        <p>Количество накопленных примогемов в крутках: </p>
        {obj.countSumm}
      </div>
    </div>
  );
};
