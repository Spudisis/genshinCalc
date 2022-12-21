import React from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeStore, getPerson } from "../../../../redux/slices/person";
import { storeItem } from "../../../../redux/types/items";
import { CalcBetween } from "../../../calculator/calcItem";
import s from "./HeroCart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import error from "../../../../assets/errorImg.png";
import { FindImage } from "../../findImageJson";
import { useSelector } from "react-redux";
import { storage } from "../../../../firebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Actions } from "./components/actions";

export const HeroCart = React.memo(({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  const dispatch = useAppDispatch();
  const { uid } = useSelector(getPerson);

  const [obj, setObj] = React.useState({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
  const [primogems, setPrimogems] = React.useState(0);
  const [countGemsPlus, setAddPrimogems] = React.useState(0);
  const [primogemsMinusSumm, setPrimogemsMinusSumm] = React.useState(0);

  const [imageFind, setImagefind] = React.useState(false); //проверка откуда изображаение fasle-ссылкой, true-с json'а
  const [imageCheck, setImageCheck] = React.useState(image); //отсюда берется изображение (ссылка или название)
  const [imageFirebase, setImageFirebase] = React.useState(false); //проверка, изображение с файрбейза или нет
  React.useEffect(() => {
    //рассчет примогемов
    const count = CalcBetween({ id, dateStart, dateEnd, countStart, countPrimogems, image });
    if (count) {
      setObj(count);
    }
  }, []);
  React.useEffect(() => {
    //Откуда картинка
    const a = FindImage(image);
    //если картинка с Json
    if (a) {
      setImagefind(true);
      setImageCheck(a.img);
      //если с firebase
    } else {
      setImagefind(false);
      setImageCheck(image);

      //если картинка ссылкой

      displayImage(image);
    }
  }, [image]);
  React.useEffect(() => {
    if (primogems && obj.countSave) {
      setPrimogemsMinusSumm(primogems - obj.countSave);
    }
  }, [primogems]);

  const handleChange = (e: any) => {
    const count = e.target.value;
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

  const displayImage = async (image: string) => {
    const listRef = ref(storage, `images/${uid}/`);
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name === image) {
            console.log(itemRef.name, image);
            getDownloadURL(itemRef).then((getURL) => {
              console.log(getURL);
              setImageFirebase(true);
              setImageCheck(getURL);
            });
          }
        });
      })
      .catch((error) => {});
  };

  return (
    <div className={s.item}>
      <div className={s.info}>
        <div className={s.mainInfoCart}>
          <div className={s.imageContain}>
            <img
              src={imageFind ? require("../../../../assets/heroes/" + imageCheck) : imageCheck}
              alt=""
              onError={() => setImageCheck(error)}
            />
          </div>

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
      <Actions
        imageFirebase={imageFirebase}
        setImageFirebase={(n: boolean) => setImageFirebase(n)}
        id={id}
        image={image}
        uid={uid}
      />
    </div>
  );
});
