import React from "react";
import { Formik, Form } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { getNumberOfDays } from "../../../../utils/getNumberOfDays";

import { Fields } from "./Fields";
import { Drag } from "./drag";
import { createHero } from "../../../../api/heros";
import { addStore } from "../../../../store/slices/person";

export const CreateHero = () => {
  const uid = useAppSelector((store) => store.person.uid);
  const dispatch = useAppDispatch();
  const [focusDateStart, setFocusDateStart] = React.useState(false);
  const [focusDateEnd, setfocusDateEnd] = React.useState(false);
  const [focusPrimogemsOfDay, setfocusPrimogemsOfDay] = React.useState(false);
  const [focusPrimogemsStart, setfocusPrimogemsStart] = React.useState(false);
  const [focusHrefImg, setfocusHrefImg] = React.useState(false);

  const [ViewListHeroes, setViewListHeroes] = React.useState(false);
  const [selectImg, setSelectImg] = React.useState("");

  const [objImg, setObjImg] = React.useState("");
  const [drag, setDrag] = React.useState(false);

  const handleChange = (e: any) => {
    objImg !== "" && setObjImg("");
    const value = e.target.value;
    setSelectImg(value);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          dateStart: "",
          dateEnd: "",
          countPrimogems: 0,
          countStart: 0,
          image: "",
          imagePath: false,
        }}
        validate={(values: any) => {
          const errors: any = {};
          if (values.name.length === 0) {
            errors.name = "Обязательное поле";
          } else if (values.name.length > 12) {
            errors.name = "Не больше 12 символов";
          }
          if (values.dateEnd && values.dateStart) {
            const { dateStart, dateEnd } = values;
            const date_start = dateStart;
            const date_end = dateEnd;
            const dateEndParse = getNumberOfDays({ date_start, date_end });
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
        onSubmit={async (values: any, { resetForm }: any) => {
          if (!objImg) {
            values.image = selectImg;
            values.imagePath = false;
          } else {
            values.imagePath = true;
            values.image = "";
          }
          const { name, dateStart, dateEnd, countPrimogems, countStart, image, imagePath } = values;
          const formData = new FormData();
          formData.append("name", name);
          formData.append("date_start", dateStart);
          formData.append("date_end", dateEnd);
          formData.append("valueDayByDay", `${countPrimogems}`);
          formData.append("countStart", `${countStart}`);
          formData.append("image", image);
          formData.append("imagePath", `${imagePath}`);
          formData.append("img", objImg);
          formData.append("personId", uid);

          createHero(formData).then((data) => dispatch(addStore(data)));

          resetForm();
        }}
      >
        {({ isValid }: any) => (
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
