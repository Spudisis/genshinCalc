import React from "react";
import { obj } from "../../../store/slices/calcPrimogemObj";

import s from "../HeroCart.module.scss";

type InfoCart = {
  obj: obj;
  primogems: number;
  primogemsMinusSumm: number;
  initialCountPrimogems: number;
};

export const Info = ({ obj, primogems, primogemsMinusSumm, initialCountPrimogems }: InfoCart) => {
  const lastWishes = Math.floor(primogemsMinusSumm / 160);
  const wishesAllPrimogems = Math.floor(initialCountPrimogems / 160);

  return (
    <div className={s.information}>
      <p>
        Количество примогемов:<br></br> {obj.valueSave}
      </p>
      <p>
        Количество в крутках:<br></br> {obj.valueSum ? obj.valueSum : "0"}
      </p>
      <p>
        Остаток:<br></br> {primogems && primogemsMinusSumm}
      </p>
      <p>
        Остаток в крутках:<br></br> {lastWishes}
        <span className={s.sideWishes}>
          {initialCountPrimogems > 0 ? `+${wishesAllPrimogems}=${lastWishes + wishesAllPrimogems}` : ""}
        </span>
      </p>
      <p>
        Дней до конца накопления:<br></br> {obj.betweenDays ? obj.betweenDays - obj.nowDays : "Нет конечной даты"}
      </p>
      <p>
        Какой сейчас день накопления:<br></br>
        {obj.nowDays}
      </p>
      <p>
        Будет к концу даты:<br></br>
        {obj.betweenSum ? obj.betweenSum : "Нет конечной даты"}
      </p>
    </div>
  );
};
