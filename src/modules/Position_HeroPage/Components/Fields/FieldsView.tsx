import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { storeItem, Synchronization, valueDayByDay } from "../../../../store/types/items";
import { useAppDispatch } from "../../../../store/hooks";
import { setSoloHero } from "../../../../store/slices/heroes";

import { FormObserver } from "./observerForm";
import { getNumberOfDays } from "../../../../utils";
import { updateHero } from "../../../../api/heros";

import s from "./fields.module.scss";

import { DayByDayList } from "../DayByDayList/DayByDayList";

type fieldsView = {
  hero: storeItem;
  addPrimogems: (n: number, c: number) => void;
};

type values = {
  id: number;
  name: string;
  date_start: string;
  date_end: string;
  valueStart: number;
  valueAdd: number;
  image: string;
  Synchronization: Synchronization;
  valueDayByDays: valueDayByDay[];
  valueWishes: number;
};

export const FieldsView = ({ hero, addPrimogems }: fieldsView) => {
  const dispatch = useAppDispatch();
  const id = React.useId();
  const [resetFormButton, setResetFormButton] = React.useState(false);
  const [addPrimogemsCount, setAddPrimogemsCount] = React.useState(0);

  const handleReset = (resetForm: () => void) => {
    setResetFormButton(false);
    resetForm();
  };

  const onSubmit = (values: any) => {
    setResetFormButton(false);

    updateHero(values).then(() => dispatch(setSoloHero(values)));
  };
  return (
    <div className={s.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          id: hero.id,
          name: hero.name,
          date_start: hero.date_start,
          date_end: hero.date_end,
          valueStart: hero.valueStart,
          valueAdd: hero.valueAdd,
          image: hero.image,
          Synchronization: hero.Synchronization,
          valueDayByDays: hero.valueDayByDays,
          valueWishes: hero.valueWishes,
        }}
        validate={(values: values) => {
          const errors: any = {};
          setResetFormButton(true);

          if (values.date_end && values.date_start) {
            const { date_start, date_end } = values;

            const dateEndParse = getNumberOfDays({ date_start, date_end });

            if (dateEndParse < 0) {
              errors.dateStart = "Начало не может быть после конца";
            }
          } else if (!values.date_start) {
            errors.dateStart = "Укажите дату";
          }

          if (values.valueStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }

          return errors;
        }}
        onSubmit={(values: values) => {
          console.log(values);
        }}
      >
        {({ resetForm, values }: { resetForm: any; values: values }) => (
          <Form>
            <FormObserver />
            <div className={s.content}>
              <div className={s.head}>
                <h3>{hero.name ? hero.name : "Нет имени"}</h3>
                {resetFormButton && (
                  <button type="button" className={s.resetForm} onClick={() => handleReset(resetForm)}>
                    Сброс
                  </button>
                )}
              </div>
              <div className={s.columns}>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "date_start"}>Дата начала</label>
                  <Field type="date" name="date_start" id={id + "date_start"} />
                  <ErrorMessage className={s.error} name="date_start" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "date_end"}>Дата конца</label>
                  <Field type="date" name="date_end" id={id + "date_end"} />
                  <ErrorMessage className={s.error} name="date_end" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "valueStart"}>Изначальное количество примогемов</label>
                  <Field readOnly type="number" name="valueStart" id={id + "valueStart"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "valueDayByDay"}>Количество откладываемых примогемов</label>
                  <details className={s.details}>
                    <summary>Список</summary>
                    <DayByDayList hero={hero} />
                  </details>
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "synchValue"}>Синхронизация</label>
                  <Field readOnly type="number" name="synchValue" id={id + "synchValue"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "valueAdd"}>Добавленные</label>
                  <Field readOnly type="number" name="valueAdd" id={id + "valueAdd"} />
                  <details className={s.details}>
                    <summary>Добавить</summary>
                    <div className={s.info}>
                      <input
                        type="number"
                        value={addPrimogemsCount}
                        onChange={(e) => setAddPrimogemsCount(+e.target.value)}
                      />
                      <button type="button" onClick={() => addPrimogems(hero.id, addPrimogemsCount + hero.valueAdd)}>
                        Добавить
                      </button>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            <button className={s.submit} type="submit" onClick={() => onSubmit(values)}>
              Изменить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
