import React from "react";
import { Formik, Form } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getNumberOfDays } from "../../utils/getNumberOfDays";
import { Fields } from "./Fields";
import { DragAndDrop } from "./DragAndDrop";
import { createHero, getHeroes } from "../../modules/ListHeroes/Api/HeroesApi";
import { CreateFormData } from "./CreateFormData";
import { ButtonSubmit } from "../../UI/Button/ButtonSubmit";
import { setStore } from "../../store/slices/heroes";

export interface CreateHeroForm {
  name: string;
  date_start: string;
  date_end: string;
  valuePrimogems: number;
  valueStart: number;
  image: string;
  imagePath: boolean;
}

type ErrorCreateHero = Partial<Record<keyof CreateHeroForm, string>>; //необязательные значения в стринг

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
        validate={(values: CreateHeroForm) => {
          const errors: ErrorCreateHero = {};

          if (values.name.length === 0) {
            errors.name = "Обязательное поле";
          } else if (values.name.length > 12) {
            errors.name = "Не больше 12 символов";
          }
          if (values.date_end && values.date_start) {
            const { date_start, date_end } = values;

            const dateEndParse = getNumberOfDays({ date_start, date_end });
            if (dateEndParse < 0) {
              errors.date_start = "Начало не может быть после конца";
            }
          } else if (!values.date_start) {
            console.log("aa");
            errors.date_start = "Укажите дату";
          }
          if (values.valuePrimogems < 0) {
            errors.valuePrimogems = "Не может быть меньше 0";
          }
          if (values.valueStart < 0) {
            errors.valueStart = "Не может быть меньше 0";
          }
          if (values.valueStart.toString().length > 10) {
            errors.valueStart = "Так много?";
          }
          if (values.valuePrimogems.toString().length > 10) {
            errors.valuePrimogems = "Так много?";
          }
          if (!values.valuePrimogems && values.valuePrimogems !== 0) {
            errors.valuePrimogems = "Не может быть пустым";
          }
          if (!values.valueStart && values.valueStart !== 0) {
            errors.valueStart = "Не может быть пустым";
          }
          if (values.valuePrimogems.toString().replace(/[^0-9]/g, "") !== values.valuePrimogems.toString()) {
            errors.valuePrimogems = "Целое положительное";
          }
          if (values.valueStart.toString().replace(/[^0-9]/g, "") !== values.valueStart.toString()) {
            errors.valuePrimogems = "Целое положительное";
          }
          return errors;
        }}
        onSubmit={async (values: CreateHeroForm, { resetForm }: any) => {
          console.log("aa");
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
