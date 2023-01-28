import React from "react";
import { Formik, Form } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { getNumberOfDays } from "../../../../utils/getNumberOfDays";

import { Fields } from "./Fields";
import { DragAndDrop } from "./DragAndDrop";
import { createHero, getHeroes } from "../../Api/HeroesApi";

import { CreateFormData } from "./CreateFormData";
import { ButtonSubmit } from "../../../../UI/Button/ButtonSubmit";
import { setStore } from "../../../../store/slices/heroes";

export type createHeroForm = {
  name: string;
  date_start: string;
  date_end: string;
  valuePrimogems: number;
  valueStart: 0;
  image: string;
  imagePath: boolean;
};

export const CreateHero = () => {
  const id = useAppSelector((store) => store.person.id);
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
          date_start: "",
          date_end: "",
          valuePrimogems: 0,
          valueStart: 0,
          image: "",
          imagePath: false,
        }}
        validate={(values: createHeroForm) => {
          const errors: any = {};
          if (values.name.length === 0) {
            errors.name = "Обязательное поле";
          } else if (values.name.length > 12) {
            errors.name = "Не больше 12 символов";
          }
          if (values.date_end && values.date_start) {
            const { date_start, date_end } = values;

            const dateEndParse = getNumberOfDays({ date_start, date_end });
            if (dateEndParse < 0) {
              errors.dateStart = "Начало не может быть после конца";
            }
          } else if (!values.date_start) {
            errors.dateStart = "Укажите дату";
          }
          if (values.valuePrimogems < 0) {
            errors.countPrimogems = "Не может быть меньше 0";
          }
          if (values.valueStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }
          if (!values.valuePrimogems && values.valuePrimogems !== 0) {
            errors.countPrimogems = "Не может быть пустым";
          }
          if (!values.valueStart && values.valueStart !== 0) {
            errors.countStart = "Не может быть пустым";
          }
          return errors;
        }}
        onSubmit={async (values: createHeroForm, { resetForm }: any) => {
          if (!objImg) {
            values.image = selectImg;
            values.imagePath = false;
          } else {
            values.imagePath = true;
            values.image = "";
          }
          const formData = CreateFormData(values, id, objImg);
          createHero(formData)
            .then(() => {
              getHeroes(id).then((data) => {
                dispatch(setStore(data));
              });
              resetForm();
            })
            .catch((e) => console.log(e));
        }}
      >
        {() => (
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
              <DragAndDrop
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
            <ButtonSubmit name={"Добавить"} />
          </Form>
        )}
      </Formik>
    </>
  );
};
