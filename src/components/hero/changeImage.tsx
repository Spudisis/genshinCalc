import React from "react";
import s from "./HeroOutput/HeroCart/HeroCart.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ChangeImageBlock = ({ setChangeItemImage }: any) => {
  const [drag, setDrag] = React.useState(false);
  const [selectImg, setSelectImg] = React.useState("");

  const [objImg, setObjImg] = React.useState("");
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
    console.log(name);
    setSelectImg(image);
    setDrag(false);
    setSelectImg(name);
  };

  return (
    <div className={s.downloadNewImage}>
      {selectImg ? (
        <div className={s.sectionDownload}>
          <button className={s.buttonsaveImage}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
          <button
            className={s.buttonsaveImage}
            onClick={() => {
              setSelectImg("");
              setChangeItemImage(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark as IconProp} />
          </button>
        </div>
      ) : (
        <>
          {!drag ? (
            <div
              className={s.sectionDownload}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
            >
              Перетащите изображение в эту область
            </div>
          ) : (
            <div
              className={`${s.sectionDownload} + ${s.sectionForFile}`}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropFile(e)}
            >
              File
            </div>
          )}
        </>
      )}
      <div>
        или вставьте ссылку <input type="text" />
      </div>
    </div>
  );
};
