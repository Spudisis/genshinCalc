import { useAppDispatch } from "../../store/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Synchronization } from "../../store/types/items";
import { deleteSynchro, editSynchro } from "../../store/slices/synchronization";
import s from "./sync.module.scss";
import React from "react";
type viewSync = {
  id: number;
  name: string;
  value: number;
  typeValue: string;
  synchro: Synchronization[];
};

export const FormSync = ({ id, name, value, typeValue, synchro }: viewSync) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteSynchro(id));
  };

  const sum = synchro.map((elem) => {
    if (elem.id !== id && elem.typeValue !== "number") return elem;
    return null
  }).reduce((prev, sumElem) => (sumElem && sumElem.value ? prev + sumElem.value : prev + 0), 0);

  return (
    <Formik
      enableReinitialize
      initialValues={{ id: id, name: name, value: value, typeValue: typeValue }}
      validate={(values) => {
        const errors: any = {};
        if (values.value === 0 || values.value < 0 || !values.value) {
          errors.value = "Значение должно быть больше 0";
        }

        if (values.typeValue === "percent" && +values.value + +sum > 100) {
          errors.value = "Синхронизация превышает 100%";
        }
        return errors;
      }}
      onSubmit={(values) => {
        dispatch(editSynchro(values));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <li>
            <div className={s.groupInput}>{name}</div>
            <div className={s.groupInput}>
              <Field type="numeric" name="value" />
              <ErrorMessage name="value" component="div" className={s.error} />
            </div>
            <div className={s.groupInput}>{typeValue === "percent" ? "%" : "прим."}</div>

            <button type="submit" className={s.button}>
              Сохранить
            </button>
            <button type="button" className={s.button} onClick={() => handleDelete(id)}>
              Удалить
            </button>
          </li>
        </Form>
      )}
    </Formik>
  );
};
