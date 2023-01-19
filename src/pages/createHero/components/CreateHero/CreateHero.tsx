import React from "react";
import { Formik, Form } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addStore } from "../../../../store/slices/person";

import { UpdateStore, UploadImg } from "../../../../firebase/index";
import { getNumberOfDays } from "../../../../utils/getNumberOfDays";

import { Fields } from "./Fields";
import { Drag } from "./drag";

export const CreateHero = () => {
  const dispatch = useAppDispatch();
  const primogems = useAppSelector((store) => store.primogemSlice.primogems);
  const synchro = useAppSelector((store) => store.syncSlice.synchro);
  const { uid, store } = useAppSelector((store) => store.person);

  const [focusDateStart, setFocusDateStart] = React.useState(false);
  const [focusDateEnd, setfocusDateEnd] = React.useState(false);
  const [focusPrimogemsOfDay, setfocusPrimogemsOfDay] = React.useState(false);
  const [focusPrimogemsStart, setfocusPrimogemsStart] = React.useState(false);
  const [focusHrefImg, setfocusHrefImg] = React.useState(false);

  const [ViewListHeroes, setViewListHeroes] = React.useState(false);
  const [selectImg, setSelectImg] = React.useState("");

  const [objImg, setObjImg] = React.useState("");
  const [drag, setDrag] = React.useState(false);

  React.useEffect(() => {
    if (uid && store.length !== 0) UpdateStore({ uid, store, primogems, synchro });
  }, [store, uid, primogems, synchro]);

  const handleChange = (e: any) => {
    objImg !== "" && setObjImg("");
    const value = e.target.value;
    setSelectImg(value);
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", dateStart: "", dateEnd: "", countPrimogems: 0, countStart: 0, image: "" }}
        validate={(values) => {
          const errors: any = {};
          if (values.name.length === 0) {
            errors.name = "Обязательное поле";
          } else if (values.name.length > 12) {
            errors.name = "Не больше 12 символов";
          }
          if (values.dateEnd && values.dateStart) {
            const { dateStart, dateEnd } = values;
            const dateEndParse = getNumberOfDays({ dateStart, dateEnd });
            if (dateEndParse < 0) {
              errors.dateStart = "Начало не может быть после конца";
            }
          } else if (!values.dateStart) {
            errors.dateStart = "Укажите дату";
          }
          if (values.countPrimogems < 0) {
            errors.countPrimogems = "Не может быть меньше 0";
          }
          if (values.countStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }
          if (!values.countPrimogems && values.countPrimogems !== 0) {
            errors.countPrimogems = "Не может быть пустым";
          }
          if (!values.countStart && values.countStart !== 0) {
            errors.countStart = "Не может быть пустым";
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          if (!values.image) {
            values.image = selectImg;
          }
          objImg !== "" && (await UploadImg({ objImg, uid }));
          const synchValue = 0;
          const countAdd = 0;
          const id = Math.floor(10000000 + Math.random() * (99999999 - 10000000 + 1));
          dispatch(addStore({ id, ...values, synchValue, countAdd }));

          resetForm();
          setSelectImg("");
        }}
      >
        {({ isValid }) => (
          <Form className={s.form}>
            <div className={s.inputs}>
              <Fields
                setFocusDateStart={setFocusDateStart}
                focusDateStart={focusDateStart}
                setfocusDateEnd={setfocusDateEnd}
                setfocusPrimogemsOfDay={setfocusPrimogemsOfDay}
                setfocusPrimogemsStart={setfocusPrimogemsStart}
                focusPrimogemsStart={focusPrimogemsStart}
                focusDateEnd={focusDateEnd}
                focusPrimogemsOfDay={focusPrimogemsOfDay}
              />

              <Drag
                drag={drag}
                setDrag={setDrag}
                setObjImg={setObjImg}
                setfocusHrefImg={setfocusHrefImg}
                handleChange={handleChange}
                setViewListHeroes={setViewListHeroes}
                ViewListHeroes={ViewListHeroes}
                selectImg={selectImg}
                focusHrefImg={focusHrefImg}
                setSelectImg={setSelectImg}
              />
            </div>

            <button disabled={!isValid} className={s.submit} type="submit">
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
