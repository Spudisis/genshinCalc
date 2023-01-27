import React from "react";
import { Formik, Form } from "formik";
import s from "./Style.module.scss";

import { registration } from "../../api/userApi";

import { ButtonSubmit } from "../../../../UI/Button/ButtonSubmit";
import { InputBlock } from "../../../../UI/RegAuth/InputBlock";
import { useNavigate } from "react-router-dom";
import { registrationConfirm, Site } from "../../../../const/routes";
export const Registration = () => {
  const id = React.useId();
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
        validate={(values: any) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Обязательное поле";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Неправильный Email";
          }
          if (values.password.length < 6) {
            errors.password = "Пароль должен быть не менее 6 символов";
          }
          if (values.password !== values.repeatPassword) {
            errors.repeatPassword = "Пароли не совпадают";
          }

          return errors;
        }}
        onSubmit={async (values: any) => {
          try {
            const res: any = await registration(values);
            navigate(Site + registrationConfirm);
          } catch (e: any) {
            alert(e.response.data.message);
          }
        }}
      >
        {() => (
          <Form className={s.form}>
            <div>
              <InputBlock id={id} nameId={"email"} placeholder="Логин" type="email" name="Email" />
              <InputBlock id={id} nameId={"password"} placeholder="Пароль" type="password" name="Пароль" />
              <InputBlock
                id={id}
                nameId={"repeatPassword"}
                placeholder="Пароль"
                type="password"
                name="Повторите пароль"
              />
            </div>
            <ButtonSubmit name="Регистрация" />
          </Form>
        )}
      </Formik>
    </>
  );
};
