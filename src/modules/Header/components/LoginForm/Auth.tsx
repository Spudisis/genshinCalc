import React from "react";
import { Formik, Form } from "formik";
import s from "./Style.module.scss";

import { login } from "../../api/userApi";

import { useAppDispatch } from "../../../../store/hooks";
import { setUid } from "../../store/reducer";

import { ButtonSubmit } from "../../../../UI/Button/ButtonSubmit";
import { InputBlock } from "../../../../UI/RegAuth/InputBlock";

export const Auth = () => {
  const id = React.useId();
  const dispatch = useAppDispatch();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
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

          return errors;
        }}
        onSubmit={async (values: any) => {
          try {
            const res: any = await login(values);
            const { user } = res.userData;
            if (user.isActivated) {
              dispatch(setUid(user.id));
            }
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
            </div>
            <ButtonSubmit name="Войти" />
          </Form>
        )}
      </Formik>
    </>
  );
};
