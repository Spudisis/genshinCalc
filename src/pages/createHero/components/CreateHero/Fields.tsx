import { ErrorMessage, Field } from "formik";
import React from "react";
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
        <div className={s.inputBlock}>
          <label htmlFor={id + "name"}>Имя карточки</label>
          <Field type="input" name="name" id={id + "name"} placeholder="Имя" />
          <ErrorMessage name="name" component="div" className={s.errorMessage} />
        </div>
        <div className={s.inputBlock}>
          <label
            htmlFor={id + "dateStart"}
            onMouseEnter={() => setFocusDateStart(true)}
            onMouseLeave={() => setFocusDateStart(false)}
          >
            Дата начала
          </label>
          <Field type="date" name="dateStart" id={id + "dateStart"} placeholder="Дата" />
          <ErrorMessage name="dateStart" component="div" className={s.errorMessage} />
          {focusDateStart && (
            <div className={s.infoSide}>
              <p>Дата, с которой начнется накопление примогемов</p>
            </div>
          )}
        </div>
        <div className={s.inputBlock}>
          <label
            htmlFor={id + "dateEnd"}
            onMouseEnter={() => setfocusDateEnd(true)}
            onMouseLeave={() => setfocusDateEnd(false)}
          >
            Дата конца*
          </label>
          <Field type="date" name="dateEnd" id={id + "dateEnd"} placeholder="Дата" />
          <ErrorMessage name="dateEnd" component="div" className={s.errorMessage} />
          {focusDateEnd && (
            <div className={s.infoSide}>
              <p>Дата, когда закончится накопление гемов (необязательное поле)</p>
            </div>
          )}
        </div>
      </div>
      <div className={s.inputsCommon}>
        <div className={s.inputBlock}>
          <label
            htmlFor={id + "countPrimogems"}
            onMouseEnter={() => setfocusPrimogemsOfDay(true)}
            onMouseLeave={() => setfocusPrimogemsOfDay(false)}
          >
            Откладывать в день
          </label>
          <Field type="number" name="countPrimogems" id={id + "countPrimogems"} placeholder="Число" />
          <ErrorMessage name="countPrimogems" component="div" className={s.errorMessage} />
          {focusPrimogemsOfDay && (
            <div className={s.infoSide}>
              <p>Количество примогемов, которое вы хотите откладывать ежедневно (можно будет изменить)</p>
            </div>
          )}
        </div>
        <div className={s.inputBlock}>
          <label
            htmlFor={id + "countStart"}
            onMouseEnter={() => setfocusPrimogemsStart(true)}
            onMouseLeave={() => setfocusPrimogemsStart(false)}
          >
            Изначальное кол-во
          </label>
          <Field type="number" name="countStart" id={id + "countStart"} placeholder="Число" />
          <ErrorMessage name="countStart" component="div" className={s.errorMessage} />
          {focusPrimogemsStart && (
            <div className={s.infoSide}>
              <p>Изначальное количество примогемов, которое вы хотите отложить</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
