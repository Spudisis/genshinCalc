import { ErrorMessage, Field } from "formik";
import React from "react";
import { SelectHero } from "../../../../components";
import s from "./createHero.module.scss";

export const Drag = ({
  drag,
  setDrag,
  setObjImg,
  setfocusHrefImg,
  handleChange,
  setViewListHeroes,
  ViewListHeroes,
  selectImg,
  focusHrefImg,
  setSelectImg,
}: any) => {
  const dragStartHandler = (e: any) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropFile = async (e: any) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const image = await files[0];
    const { name } = image;
    console.log(name);
    setObjImg(image);
    setDrag(false);
    setSelectImg(name);
  };
  const id = React.useId();
  return (
    <>
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
    </>
  );
};
