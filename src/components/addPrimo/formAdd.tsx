import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

import s from "./addPrimogems.module.scss";

type add = {
  calcPrimogems: (n: valuesForm) => void;
  primogemsCount: number;
  wishCount: number;
  starglitterCount: number;
};

type valuesForm = {
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
};

export const FormAdd = ({ calcPrimogems, primogemsCount, wishCount, starglitterCount }: add) => {
  const id = React.useId();

  return (
    <Formik
      enableReinitialize
      initialValues={{ countPrimogems: primogemsCount, countWishes: wishCount, countStarglitter: starglitterCount }}
      validate={(values: any) => {
        const errors: any = {};
        if (!values.countPrimogems && values.countPrimogems !== 0) {
          errors.countPrimogems = "Обязательное поле";
        }
        if (!values.countStarglitter && values.countStarglitter !== 0) {
          errors.countStarglitter = "Обязательное поле";
        }
        if (!values.countWishes && values.countWishes !== 0) {
          errors.countWishes = "Обязательное поле";
        }
        return errors;
      }}
      onSubmit={(values: any, { resetForm }: any) => {
        calcPrimogems(values);
        resetForm();
      }}
    >
      {() => (
        <Form className={s.form}>
          <div className={s.inputs}>
            <div className={s.inputBlock}>
              <label htmlFor={id + "countPrimogems"}>Количество примогемов</label>
              <Field type="number" name="countPrimogems" id={id + "countPrimogems"} placeholder="Количество" />
              <ErrorMessage name="countPrimogems" component="div" className={s.errorMessage} />
            </div>
            <div className={s.inputBlock}>
              <label htmlFor={id + "countWishes"}>Количество круток</label>
              <Field type="number" name="countWishes" id={id + "countWishes"} placeholder="Количество" />
              <ErrorMessage name="countWishes" component="div" className={s.errorMessage} />
            </div>
            <div className={s.inputBlock}>
              <label htmlFor={id + "countStarglitter"}>Количество блеска</label>
              <Field type="number" name="countStarglitter" id={id + "countStarglitter"} placeholder="Количество" />
              <ErrorMessage name="countStarglitter" component="div" className={s.errorMessage} />
            </div>
          </div>

          <button type="submit" className={s.submit}>
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
};
