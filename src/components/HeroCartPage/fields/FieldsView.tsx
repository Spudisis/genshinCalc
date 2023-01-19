import s from "./fields.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { storeItem } from "../../../store/types/items";
import { FormObserver } from "./observerForm";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeItemStore } from "../../../store/slices/person";

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
          const errors = {};
          setResetFormButton(true);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
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
                  <ErrorMessage name="dateStart" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "dateEnd"}>Дата конца</label>
                  <Field type="date" name="dateEnd" id={id + "dateEnd"} />
                  <ErrorMessage name="dateEnd" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "countStart"}>Изначальное количество примогемов</label>
                  <Field readOnly type="number" name="countStart" id={id + "countStart"} />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "countPrimogems"}>Количество откладываемых примогемов</label>
                  <Field type="number" name="countPrimogems" id={id + "countPrimogems"} />
                  <ErrorMessage name="countPrimogems" component="div" />
                </div>
                <div className={s.inputBlock}>
                  <label htmlFor={id + "synchValue"}>Синхронизация</label>
                  <Field readOnly type="number" name="synchValue" id={id + "synchValue"} />
                  <ErrorMessage name="synchValue" component="div" />
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
