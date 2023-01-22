import s from "./Fields.module.scss";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { storeItem } from "../../../store/types/items";
import { FormObserver } from "./observerForm";

import { useAppDispatch } from "../../../store/hooks";
import { changeItemStore } from "../../../store/slices/person";
import { getNumberOfDays } from "../../../utils";
import { updateHero } from "../../../api/heros";

type fieldsView = {
  hero: storeItem;
  addPrimogems: (n: number, c: number) => void;
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

    updateHero(values).then(() => dispatch(changeItemStore(values)));
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
          valueDayByDay: hero.valueDayByDay,
          countStart: hero.countStart,
          countAdd: hero.countAdd,
          synchValue: hero.synchValue,
          image: hero.image,
        }}
        validate={(values: any) => {
          const errors: any = {};
          setResetFormButton(true);

          if (values.dateEnd && values.dateStart) {
            const { date_start, date_end } = values;

            const dateEndParse = getNumberOfDays({ date_start, date_end });

            if (dateEndParse < 0) {
              errors.dateStart = "Начало не может быть после конца";
            }
          } else if (!values.dateStart) {
            errors.dateStart = "Укажите дату";
          }
          if (values.valueDayByDay < 0) {
            errors.valueDayByDay = "Не может быть меньше 0";
          }
          if (values.countStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }
          if (!values.valueDayByDay && values.valueDayByDay !== 0) {
            errors.valueDayByDay = "Не может быть пустым";
          }
          if (!values.countStart && values.countStart !== 0) {
            errors.countStart = "Не может быть пустым";
          }
          return errors;
        }}
        onSubmit={(values: any) => {
          console.log(values);
        }}
      >
        {({ resetForm, values }: any) => (
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
                  <label htmlFor={id + "countStart"}>Изначальное количество примогемов</label>
                  <Field readOnly type="number" name="countStart" id={id + "countStart"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "valueDayByDay"}>Количество откладываемых примогемов</label>
                  <Field type="number" name="valueDayByDay" id={id + "valueDayByDay"} />
                  <ErrorMessage className={s.error} name="valueDayByDay" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "synchValue"}>Синхронизация</label>
                  <Field readOnly type="number" name="synchValue" id={id + "synchValue"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "countAdd"}>Добавленные</label>
                  <Field readOnly type="number" name="countAdd" id={id + "countAdd"} />
                  <details className={s.details}>
                    <summary>Добавить</summary>
                    <div className={s.info}>
                      <input
                        type="number"
                        value={addPrimogemsCount}
                        onChange={(e) => setAddPrimogemsCount(+e.target.value)}
                      />
                      <button type="button" onClick={() => addPrimogems(hero.id, addPrimogemsCount)}>
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
