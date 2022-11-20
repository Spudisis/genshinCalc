import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { getPerson, addStore } from "../../../redux/slices/person";
import { useSelector } from "react-redux";
import { UpdateStore } from "../../../firebase/update/updateStoreUser";
import { getNumberOfDays } from "../../calculator/getNumberOfDays";
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
          if (values.dateEnd && values.dateStart) {
            const { dateStart, dateEnd } = values;
            const dateEndParse = getNumberOfDays({ dateStart, dateEnd });
            if (dateEndParse < 0) {
              errors.dateEnd = "Начало не может быть после конца";
            }
          }
          if (values.countPrimogems < 0) {
            errors.countPrimogems = "Не может быть меньше 0";
          }
          if (values.countStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }
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
                <label htmlFor={id + "dateStart"}>Дата начала</label>
                <Field type="date" name="dateStart" id={id + "dateStart"} placeholder="Дата" />
                <ErrorMessage name="dateStart" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "dateEnd"}>Дата конца*</label>
                <Field type="date" name="dateEnd" id={id + "dateEnd"} placeholder="Дата" />
                <ErrorMessage name="dateEnd" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "countPrimogems"}>Откладывать в день</label>
                <Field type="number" name="countPrimogems" id={id + "countPrimogems"} placeholder="Число" />
                <ErrorMessage name="countPrimogems" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "countStart"}>Со сколько начинаем копить</label>
                <Field type="number" name="countStart" id={id + "countStart"} placeholder="Число" />
                <ErrorMessage name="countStart" component="div" className={s.errorMessage} />
              </div>
              <div className={s.inputBlock}>
                <label htmlFor={id + "image"}>Изображение*</label>
                <Field type="text" name="image" id={id + "image"} placeholder="Ссылка" />
                <ErrorMessage name="image" component="div" className={s.errorMessage} />
              </div>
            </div>
            <button className={s.submit} type="submit">
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
