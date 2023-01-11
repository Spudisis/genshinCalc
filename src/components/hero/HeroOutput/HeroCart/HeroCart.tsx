import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { changeStore, getPerson } from "../../../../store/slices/person";
import { storeItem } from "../../../../store/types/items";

import { CalcBetween } from "../../../../utils/";

import s from "./HeroCart.module.scss";

import { FindImage } from "../../../../utils/findImageJson";
import { useSelector } from "react-redux";

import { storage } from "../../../../firebase/";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { Actions } from "./actions/actions";
import { ImageContain } from "./components/imageContain";
import { InputsCart } from "./components/inputsCart";
import { Info } from "./components/Info";

export type obj = {
  between: number;
  now: number;
  countSave: number;
  countSumm: number;
  betweenSumm: number;
};

export const HeroCart = React.memo(({ id, dateStart, dateEnd, countStart, countPrimogems, image }: storeItem) => {
  const dispatch = useAppDispatch();
  const { uid } = useSelector(getPerson);

  const [obj, setObj] = React.useState<obj>({ between: 0, now: 0, countSave: 0, countSumm: 0, betweenSumm: 0 });
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
  }, [id, dateStart, dateEnd, countStart, countPrimogems, image]);
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const count = e.currentTarget.value;
    if (count) {
      setPrimogems(+count);
    } else {
      setPrimogems(0);
    }
  };
  const handleAdd = (e: React.FormEvent<HTMLInputElement>) => {
    const count = e.currentTarget.value;
    if (count) {
      setAddPrimogems(+count);
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={s.item}>
      <div className={s.info}>
        <div className={s.mainInfoCart}>
          <div className={s.imageContain}>
            <ImageContain imageFind={imageFind} imageCheck={imageCheck} setImageCheck={setImageCheck} />
          </div>
          <InputsCart
            handleChange={handleChange}
            handleAdd={handleAdd}
            countGemsPlus={countGemsPlus}
            sendAdd={sendAdd}
          />
        </div>
        <Info obj={obj} primogems={primogems} primogemsMinusSumm={primogemsMinusSumm} />
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
