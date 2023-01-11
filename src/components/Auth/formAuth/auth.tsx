import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./authReg.module.scss";
export const Auth = ({ signIn }: any) => {
  const id = React.useId();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
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
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {() => (
          <Form className={s.form}>
            <div className={s.inputs}>
              <div className={s.inputBlock}>
                <label htmlFor={id + "email"}>Email</label>
                <Field type="email" name="email" id={id + "email"} placeholder="Логин" />
                <ErrorMessage name="email" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "password"}>Пароль</label>
                <Field type="password" name="password" id={id + "password"} placeholder="Пароль" />
                <ErrorMessage name="password" component="div" className={s.errorMessage} />
              </div>
            </div>
            <button className={s.submitButton} type="submit">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
