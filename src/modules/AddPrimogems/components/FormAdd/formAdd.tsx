import { Form, Formik } from "formik";
import React from "react";
import { ButtonSubmit } from "../../../../UI/Button/ButtonSubmit";
import { InputBlock } from "../../../../UI/DefaultForm/InputBlock";

import s from "./addPrimogems.module.scss";

type add = {
  calcPrimogems: (n: valuesForm) => void;
  primogemsCount: number;
  wishCount: number;
  starglitterCount: number;
};

export type valuesForm = {
  valuePrimogems: number;
  valueWishes: number;
  valueStarglitter: number;
};

export const FormAdd = ({ calcPrimogems, primogemsCount, wishCount, starglitterCount }: add) => {
  const id = React.useId();

  return (
    <Formik
      enableReinitialize
      initialValues={{ valuePrimogems: primogemsCount, valueWishes: wishCount, valueStarglitter: starglitterCount }}
      validate={(values: valuesForm) => {
        const errors: any = {};
        if (!values.valuePrimogems && values.valuePrimogems !== 0) {
          errors.countPrimogems = "Обязательное поле";
        }
        if (!values.valueStarglitter && values.valueStarglitter !== 0) {
          errors.countStarglitter = "Обязательное поле";
        }
        if (!values.valueWishes && values.valueWishes !== 0) {
          errors.countWishes = "Обязательное поле";
        }
        return errors;
      }}
      onSubmit={(values: valuesForm, { resetForm }: any) => {
        console.log(values);
        calcPrimogems(values);
        resetForm();
      }}
    >
      {() => (
        <Form className={s.form}>
          <div className={s.inputs}>
            <InputBlock
              id={id}
              nameId={"valuePrimogems"}
              placeholder={"Количество"}
              type={"number"}
              name={"Количество примогемов"}
            />
            <InputBlock
              id={id}
              nameId={"valueWishes"}
              placeholder={"Количество"}
              type={"number"}
              name={"Количество круток"}
            />
            <InputBlock
              id={id}
              nameId={"valueStarglitter"}
              placeholder={"Количество"}
              type={"number"}
              name={"Количество блеска"}
            />
          </div>
          <ButtonSubmit name={"Добавить"} />
        </Form>
      )}
    </Formik>
  );
};
