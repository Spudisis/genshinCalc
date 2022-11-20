import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { getPerson, addStore } from "../../redux/slices/person";
import { useSelector } from "react-redux";
import { UpdateStore } from "../../firebase/update/updateStoreUser";
export const CreateHero = () => {
  const id = React.useId();
  const dispath = useAppDispatch();
  const { uid, store } = useSelector(getPerson);
  React.useEffect(() => {
    if (uid && store.length !== 0) UpdateStore({ uid, store });
  }, [store]);
  return (
    <>
      <Formik
        initialValues={{ dateStart: "", dateEnd: "", countPrimogems: 0, countStart: 0, image: "" }}
        validate={(values) => {
          const errors: any = {};

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          const id = Math.floor(10000000 + Math.random() * (99999999 - 10000000 + 1));

          dispath(addStore({ id, ...values }));
        }}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.inputs}>
              <div className={s.inputBlock}>
                <label htmlFor={id + "dateStart"}>dateStart</label>
                <Field type="date" name="dateStart" id={id + "dateStart"} placeholder="Логин" />
                <ErrorMessage name="dateStart" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "dateEnd"}>dateEnd</label>
                <Field type="date" name="dateEnd" id={id + "dateEnd"} placeholder="Пароль" />
                <ErrorMessage name="dateEnd" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "countPrimogems"}>countPrimogems</label>
                <Field type="text" name="countPrimogems" id={id + "countPrimogems"} placeholder="Пароль" />
                <ErrorMessage name="countPrimogems" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "countStart"}>startPrimogems</label>
                <Field type="text" name="countStart" id={id + "countStart"} placeholder="Пароль" />
                <ErrorMessage name="countStart" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "image"}>image</label>
                <Field type="text" name="image" id={id + "image"} placeholder="Пароль" />
                <ErrorMessage name="image" component="div" className={s.errorMessage} />
              </div>
            </div>
            <div className={s.buttons}>
              <button type="submit">сенд</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
