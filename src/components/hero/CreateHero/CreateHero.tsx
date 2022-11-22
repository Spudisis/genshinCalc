import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./createHero.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { getPerson, addStore } from "../../../redux/slices/person";
import { useSelector } from "react-redux";
import { UpdateStore } from "../../../firebase/update/updateStoreUser";
import { getNumberOfDays } from "../../calculator/getNumberOfDays";
import { SelectHero } from "../selectImgHero/selectHero";
import { UploadImg } from "../../../firebase/create/uploadImg";

export const CreateHero = () => {
  const id = React.useId();
  const dispath = useAppDispatch();
  const { uid, store } = useSelector(getPerson);

  const [focusDateStart, setDocusDateStart] = React.useState(false);
  const [focusDateEnd, setfocusDateEnd] = React.useState(false);
  const [focusPrimogemsOfDay, setfocusPrimogemsOfDay] = React.useState(false);
  const [focusPrimogemsStart, setfocusPrimogemsStart] = React.useState(false);
  const [focusHrefImg, setfocusHrefImg] = React.useState(false);

  const [ViewListHeroes, setViewListHeroes] = React.useState(false);
  const [selectImg, setSelectImg] = React.useState("");

  const [objImg, setObjImg] = React.useState("");
  const [drag, setDrag] = React.useState(false);

  React.useEffect(() => {
    if (uid && store.length !== 0) UpdateStore({ uid, store });
  }, [store]);

  const handleChange = (e: any) => {
    objImg !== "" && setObjImg("");
    const value = e.target.value;
    setSelectImg(value);
  };

  function dragStartHandler(e: any) {
    e.preventDefault();
    setDrag(true);
  }
  function dragLeaveHandler(e: any) {
    e.preventDefault();
    setDrag(false);
  }
  const onDropFile = async (e: any) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const image = await files[0];
    const { name } = image;
    setObjImg(image);
    setDrag(false);
    setSelectImg(name);
  };

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
              errors.dateStart = "Начало не может быть после конца";
            }
          } else {
            errors.dateStart = "Укажите дату";
          }
          if (values.countPrimogems < 0) {
            errors.countPrimogems = "Не может быть меньше 0";
          }
          if (values.countStart < 0) {
            errors.countStart = "Не может быть меньше 0";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          if (!values.image) {
            values.image = selectImg;
          }

          objImg !== "" && UploadImg({ objImg, uid });
          const id = Math.floor(10000000 + Math.random() * (99999999 - 10000000 + 1));

          dispath(addStore({ id, ...values }));
          console.log(values);
          resetForm();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={s.form}>
            <div className={s.inputs}>
              <div className={s.inputBlock}>
                <label
                  htmlFor={id + "dateStart"}
                  onMouseEnter={() => setDocusDateStart(true)}
                  onMouseLeave={() => setDocusDateStart(false)}
                >
                  Дата начала
                </label>
                <Field type="date" name="dateStart" id={id + "dateStart"} placeholder="Дата" />
                <ErrorMessage name="dateStart" component="div" className={s.errorMessage} />
                {focusDateStart && (
                  <div className={s.infoSide}>
                    <p>Дата, с которой начнется накопление примогемов</p>
                  </div>
                )}
              </div>

              <div className={s.inputBlock}>
                <label
                  htmlFor={id + "dateEnd"}
                  onMouseEnter={() => setfocusDateEnd(true)}
                  onMouseLeave={() => setfocusDateEnd(false)}
                >
                  Дата конца*
                </label>
                <Field type="date" name="dateEnd" id={id + "dateEnd"} placeholder="Дата" />
                <ErrorMessage name="dateEnd" component="div" className={s.errorMessage} />
                {focusDateEnd && (
                  <div className={s.infoSide}>
                    <p>Дата, когда закончится накопление гемов (необязательное поле)</p>
                  </div>
                )}
              </div>
              <div className={s.inputBlock}>
                <label
                  htmlFor={id + "countPrimogems"}
                  onMouseEnter={() => setfocusPrimogemsOfDay(true)}
                  onMouseLeave={() => setfocusPrimogemsOfDay(false)}
                >
                  Откладывать в день
                </label>
                <Field type="number" name="countPrimogems" id={id + "countPrimogems"} placeholder="Число" />
                <ErrorMessage name="countPrimogems" component="div" className={s.errorMessage} />
                {focusPrimogemsOfDay && (
                  <div className={s.infoSide}>
                    <p>Количество примогемов, которое вы хотите откладывать ежедневно (можно будет изменить)</p>
                  </div>
                )}
              </div>
              <div className={s.inputBlock}>
                <label
                  htmlFor={id + "countStart"}
                  onMouseEnter={() => setfocusPrimogemsStart(true)}
                  onMouseLeave={() => setfocusPrimogemsStart(false)}
                >
                  Изначальное кол-во
                </label>
                <Field type="number" name="countStart" id={id + "countStart"} placeholder="Число" />
                <ErrorMessage name="countStart" component="div" className={s.errorMessage} />
                {focusPrimogemsStart && (
                  <div className={s.infoSide}>
                    <p>Изначальное количество примогемов, которое вы хотите отложить</p>
                  </div>
                )}
              </div>
              {!drag ? (
                <div
                  className={s.inputBlock}
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                >
                  <label
                    htmlFor={id + "image"}
                    onMouseEnter={() => setfocusHrefImg(true)}
                    onMouseLeave={() => setfocusHrefImg(false)}
                  >
                    Изображение*
                  </label>
                  <Field
                    type="text"
                    name="image"
                    id={id + "image"}
                    placeholder="Ссылка"
                    onChange={(e: any) => {
                      handleChange(e);
                    }}
                    onClick={() => setViewListHeroes(!ViewListHeroes)}
                    value={selectImg}
                    autoComplete="off"
                  />
                  <ErrorMessage name="image" component="div" className={s.errorMessage} />
                  {focusHrefImg && (
                    <div className={s.infoSide}>
                      <p>Укажите ссылку, перетащите файл в эту область или выберите из списка картинку</p>
                    </div>
                  )}
                  {ViewListHeroes && (
                    <SelectHero
                      setSelectImg={(n: string) => setSelectImg(n)}
                      setViewListHeroes={(n: boolean) => setViewListHeroes(n)}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={s.downloadFile}
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  onDrop={(e) => onDropFile(e)}
                >
                  Загрузить файл
                </div>
              )}
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
