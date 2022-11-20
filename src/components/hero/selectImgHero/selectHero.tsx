import React from "react";
import s from "./selectHero.module.scss";
import json from "../../../assets/heroes/heroes.json";
import { LoaderMini } from "../../loader/loaderMini/loaderMini";
export const SelectHero = ({ setSelectImg, setViewListHeroes }: any) => {
  const lengthMas = json.length - 1;
  let indexCounter = 0;
  const [loader, setLoader] = React.useState(true);
  React.useEffect(() => {
    if (lengthMas === indexCounter) {
      setLoader(false);
    }
  }, [indexCounter]);
  return (
    <div className={s.wrapper}>
      {loader && <LoaderMini />}
      <div className={s.images}>
        {json.map((elem: any, index) => {
          indexCounter = index;
          return (
            <img
              src={require("../../../assets/heroes/" + elem.img)}
              alt={elem.name}
              key={index + "img"}
              onClick={() => {
                setSelectImg(elem.name);
                setViewListHeroes(false);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
