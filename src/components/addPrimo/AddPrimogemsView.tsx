import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";

import { objForm } from "./AddPrimogems";
import s from "./addPrimogems.module.scss";
type FormAddPrimogems = {
  calcPrimogems: (primogems: objForm) => void;
};

export const AddPrimogemsView = ({ calcPrimogems }: FormAddPrimogems) => {
  const id = React.useId();
  return (
    <>
      <Formik
        initialValues={{ countPrimogems: 0, countWishes: 0, countStarglitter: 0 }}
        validate={(values) => {
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
        onSubmit={(values) => {
          calcPrimogems(values);
          values.countPrimogems = 0;
          values.countWishes = 0;
          values.countStarglitter = 0;
        }}
      >
        {({ isSubmitting }) => (
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
