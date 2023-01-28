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
        <p>День накопления:</p> {obj.nowDays}
      </div>
      <div>
        <p>Дней между начальной и конечной датой: </p>
        {obj.betweenDays}
      </div>
      <div>
        <p>Предварительное кол-во гемов за промежуток: </p>
        {obj.betweenSum}
      </div>
      {obj.betweenSum !== 0 && (
        <div className={s.wish}>
          <p>Предварительное кол-во в крутках: </p>
          {Math.floor(obj.betweenSum / 160)}
        </div>
      )}
      <div>
        <p>Количество накопленных примогемов: </p>
        {obj.valueSave}
      </div>
      <div className={s.wish}>
        <p>Количество накопленных примогемов в крутках: </p>
        {obj.valueSum}
      </div>
    </div>
  );
};
