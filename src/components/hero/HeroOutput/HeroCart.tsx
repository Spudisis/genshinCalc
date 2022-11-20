import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { changeStore, deleteStore } from "../../../redux/slices/person";
import { storeItem } from "../../../redux/types/items";
import { CalcBetween } from "../../calculator/calcItem";
import s from "./HeroCart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

import error from "../../../assets/errorImg.png";
import { FindImage } from "../findImageJson";
export const HeroCart = ({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const count = CalcBetween({ id, dateStart, dateEnd, countStart, countPrimogems, image });
    if (count) {
      setObj(count);
    }
    const a = FindImage(image);
    if (a) {
      setImagefind(a ? true : false);
      setImageCheck(a.img);
    }
  }, [countStart]);

  const [obj, setObj] = React.useState({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
  const [primogems, setPrimogems] = React.useState(0);
  const [countGemsPlus, setAddPrimogems] = React.useState(0);
  const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);
  const [deleteItem, setDeleteItem] = React.useState(false);

  const [imageFind, setImagefind] = React.useState(false); //если изображение с сайта, а не ссылка
  const [imageCheck, setImageCheck] = React.useState(image); //изображение лежит

  React.useEffect(() => {
    if (primogems && obj.countSave) {
      setPrimogemsMinusSumm(primogems - obj.countSave);
    }
  }, [primogems]);
  const handleChange = (e: any) => {
    const count = e.target.value;
    console.log(typeof +count);
    if (count) {
      setPrimogems(+count);
    } else {
      setPrimogems(0);
    }
  };
  const handleAdd = (e: any) => {
    const count = e.target.value;
    if (count) {
      setAddPrimogems(count);
    } else {
      setAddPrimogems(0);
    }
  };
  const sendAdd = () => {
    if (countGemsPlus) {
      dispatch(changeStore({ countGemsPlus, id }));
    }
  };

  const deleteCart = () => {
    dispatch(deleteStore(id));
  };
  return (
    <div className={s.item}>
      <div className={s.info}>
        <div className={s.mainInfoCart}>
          <img
            src={imageFind ? require("../../../assets/heroes/" + imageCheck) : imageCheck}
            alt=""
            onError={() => setImageCheck(error)}
          />
          <div className={s.inputs}>
            <div className={s.countPrimo}>
              <label htmlFor="gemsNow">Сколько гемов</label>
              <input type="number" id="gemsNow" onChange={(e: any) => handleChange(e)} placeholder="Количество" />
            </div>

            <div className={s.addGems}>
              <label htmlFor="gemsAdd">Сколько добавить</label>
              <div className={s.buttonInput}>
                <input type="number" id="gemsAdd" onChange={(e) => handleAdd(e)} placeholder="Добавить" />
                <button onClick={() => sendAdd()} disabled={countGemsPlus ? false : true}>
                  <FontAwesomeIcon icon={faCheck as IconProp} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={s.information}>
          <p>
            Количество примогемов:<br></br> {obj.countSave}
          </p>
          <p>
            Количество в крутках:<br></br> {obj.countSumm ? obj.countSumm : "0"}
          </p>
          <p>
            Остаток:<br></br> {primogems && primogemsMinusSumm}
          </p>
          <p>
            Остаток в крутках:<br></br> {primogemsMinusSumm >= 160 ? Math.floor(primogemsMinusSumm / 160) : "0"}
          </p>
          <p>
            Дней до конца накопления:<br></br> {obj.between ? obj.between : "Нет конечной даты"}
          </p>
          <p>
            Какой сейчас день накопления:<br></br>
            {obj.now}
          </p>
          <p>
            Будет к концу даты:<br></br>
            {obj.betweenSumm ? obj.betweenSumm : "Нет конечной даты"}
          </p>
        </div>
      </div>

      <div className={s.buttons}>
        <button>История изменений</button>
        {!deleteItem ? (
          <button onClick={() => setDeleteItem(true)}>
            <FontAwesomeIcon icon={faTrash as IconProp} />
          </button>
        ) : (
          <div className={s.buttonsDelete}>
            <button onClick={() => deleteCart()}>
              <FontAwesomeIcon icon={faCheck as IconProp} />
            </button>
            <button onClick={() => setDeleteItem(false)}>
              <FontAwesomeIcon icon={faXmark as IconProp} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
