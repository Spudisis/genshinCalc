import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./authReg.module.scss";
import { registration } from "../../../api/userApi";
import { useAppDispatch } from "../../../store/hooks";
import { setUid } from "../../../store/slices/person";
export const Reg = () => {
  const dispatch = useAppDispatch();
  const id = React.useId();
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

            dispatch(setUid(res.id));
            console.log(res);
          } catch (e: any) {
            alert(e.response.data.message);
          }
        }}
      >
        {() => (
          <Form className={s.form}>
            <div>
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
              <div className={s.inputBlock}>
                <label htmlFor={id + "repeatPassword"}>Повторите пароль</label>
                <Field type="password" name="repeatPassword" id={id + "repeatPassword"} placeholder="Пароль" />
                <ErrorMessage name="repeatPassword" component="div" className={s.errorMessage} />
              </div>
            </div>
            <button className={s.submitButton} type="submit">
              Регистрация
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
