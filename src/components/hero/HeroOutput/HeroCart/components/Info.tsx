import React from "react";
import { obj } from "../HeroCart";
import s from "../HeroCart.module.scss";

type InfoCart = {
  obj: obj;
  primogems: number;
  primogemsMinusSumm: number;
};

export const Info = ({ obj, primogems, primogemsMinusSumm }: InfoCart) => {
  return (
    <div className={s.information}>
      <p>
        Количество примогемов:<br></br> {obj.countSave}
      </p>
      <p>
        Количество в крутках:<br></br> {obj.countSumm ? obj.countSumm : "0"}
      </p>
      <p>
        Остаток:<br></br> {primogems && primogemsMinusSumm}
      </p>
      <p>
        Остаток в крутках:<br></br> {primogemsMinusSumm >= 160 ? Math.floor(primogemsMinusSumm / 160) : "0"}
      </p>
      <p>
        Дней до конца накопления:<br></br> {obj.between ? obj.between : "Нет конечной даты"}
      </p>
      <p>
        Какой сейчас день накопления:<br></br>
        {obj.now}
      </p>
      <p>
        Будет к концу даты:<br></br>
        {obj.betweenSumm ? obj.betweenSumm : "Нет конечной даты"}
      </p>
    </div>
  );
};
