import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { AdditionalActions } from "./AdditionalActions";

import { objForm } from "./AddPrimogems";
import s from "./addPrimogems.module.scss";
type FormAddPrimogems = {
  calcPrimogems: (primogems: objForm) => void;
  setAutoFill: (n: boolean) => void;
  autoFill: boolean;
  primogemsCount: number;
  wishCount: number;
  starglitterCount: number;
};

export const AddPrimogemsView = React.memo(
  ({ calcPrimogems, setAutoFill, autoFill, primogemsCount, wishCount, starglitterCount }: FormAddPrimogems) => {
    const id = React.useId();

    return (
      <div>
        <>
          <AdditionalActions autoFill={autoFill} setAutoFill={setAutoFill} />
        </>
        <Formik
          enableReinitialize
          initialValues={{ countPrimogems: primogemsCount, countWishes: wishCount, countStarglitter: starglitterCount }}
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
      </div>
    );
  }
);
