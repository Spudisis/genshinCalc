import { ErrorMessage, Field } from "formik";
import React from "react";
import { AddHeroInput } from "../../UI/AddHero/AddHeroInput";
import s from "./createHero.module.scss";

export const Fields = ({
  setFocusDateStart,
  focusDateStart,
  setfocusDateEnd,
  setfocusPrimogemsOfDay,
  setfocusPrimogemsStart,
  focusPrimogemsStart,
  focusDateEnd,
  focusPrimogemsOfDay,
}: any) => {
  const id = React.useId();
  return (
    <>
      <div className={s.inputsCommon}>
        <AddHeroInput
          id={id}
          nameId={"name"}
          dndFunc={setFocusDateStart}
          dndRes={false}
          placeHolder="Имя"
          name="Имя карточки"
          type="input"
          textModal=""
        />
        <AddHeroInput
          id={id}
          nameId={"date_start"}
          dndFunc={setFocusDateStart}
          dndRes={focusDateStart}
          placeHolder="Дата"
          name="Дата начала"
          type="date"
          textModal="Дата, с которой начнется накопление примогемов"
        />
        <AddHeroInput
          id={id}
          nameId={"date_end"}
          dndFunc={setfocusDateEnd}
          dndRes={focusDateEnd}
          placeHolder="Дата"
          name="Дата конца*"
          type="date"
          textModal="Дата, когда закончится накопление гемов (необязательное поле)"
        />
      </div>
      <div className={s.inputsCommon}>
        <AddHeroInput
          id={id}
          nameId={"valuePrimogems"}
          dndFunc={setfocusPrimogemsOfDay}
          dndRes={focusPrimogemsOfDay}
          placeHolder="Число"
          name="Откладывать в день*"
          type="number"
          textModal="Количество примогемов, которое вы хотите откладывать ежедневно (можно будет изменить)"
        />
        <AddHeroInput
          id={id}
          nameId={"valueStart"}
          dndFunc={setfocusPrimogemsStart}
          dndRes={focusPrimogemsStart}
          placeHolder="Число"
          name="Изначальное кол-во*"
          type="number"
          textModal="Изначальное количество примогемов, которое вы хотите отложить"
        />
      </div>
    </>
  );
};
