import s from "./fields.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { storeItem } from "../../../store/types/items";
import { FormObserver } from "./observerForm";

import { useAppDispatch } from "../../../store/hooks";
import { changeItemStore } from "../../../store/slices/person";
import { getNumberOfDays } from "../../../utils";

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

  return (
    <div className={s.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          id: hero.id,
          name: hero.name,
          dateStart: hero.dateStart,
          dateEnd: hero.dateEnd,
          countPrimogems: hero.countPrimogems,
          countStart: hero.countStart,
          countAdd: hero.countAdd,
          synchValue: hero.synchValue,
          image: hero.image,
        }}
        validate={(values) => {
          const errors: any = {};
          setResetFormButton(true);

          if (values.dateEnd && values.dateStart) {
            const { dateStart, dateEnd } = values;
            const dateEndParse = getNumberOfDays({ dateStart, dateEnd });

            if (dateEndParse < 0) {
              errors.dateStart = "Начало не может быть после конца";
            }
          } else if (!values.dateStart) {
            errors.dateStart = "Укажите дату";
          }
          if (values.countPrimogems < 0) {
            errors.countPrimogems = "Не может быть меньше 0";
          }
          if (values.countStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }
          if (!values.countPrimogems && values.countPrimogems !== 0) {
            errors.countPrimogems = "Не может быть пустым";
          }
          if (!values.countStart && values.countStart !== 0) {
            errors.countStart = "Не может быть пустым";
          }
          return errors;
        }}
        onSubmit={(values) => {
          setResetFormButton(false);

          dispatch(changeItemStore(values));
        }}
      >
        {({ isSubmitting, resetForm }) => (
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
                  <label htmlFor={id + "dateStart"}>Дата начала</label>
                  <Field type="date" name="dateStart" id={id + "dateStart"} />
                  <ErrorMessage className={s.error} name="dateStart" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "dateEnd"}>Дата конца</label>
                  <Field type="date" name="dateEnd" id={id + "dateEnd"} />
                  <ErrorMessage className={s.error} name="dateEnd" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "countStart"}>Изначальное количество примогемов</label>
                  <Field readOnly type="number" name="countStart" id={id + "countStart"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "countPrimogems"}>Количество откладываемых примогемов</label>
                  <Field type="number" name="countPrimogems" id={id + "countPrimogems"} />
                  <ErrorMessage className={s.error} name="countPrimogems" component="div" />
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
            <button className={s.submit} type="submit" disabled={isSubmitting}>
              Изменить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
