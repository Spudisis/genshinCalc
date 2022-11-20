import React from "react";
import { useSelector } from "react-redux";
import { getPerson } from "../../../redux/slices/person";
import { storeItem } from "../../../redux/types/items";
import { Hero } from "../HeroOutput/HeroTable";
import s from "./HeroList.module.scss";
import wish from "../../../assets/Objeto_Destino_entrelazado.webp";
import { HeroCart } from "../HeroOutput/HeroCart";
export const HeroList = () => {
  const { store } = useSelector(getPerson);

  const [typeView, setTypeView] = React.useState(false);
  return (
    <div className={s.wrapper}>
      <div className={s.name}>
        <h2>Накопление</h2>
        <div className={s.buttons}>
          <button onClick={() => setTypeView(!typeView)}>Вид отображения: {typeView ? "Таблица" : "Карточки"}</button>
        </div>
      </div>

      {typeView ? (
        <table className={s.table}>
          <thead>
            <tr>
              <th>Кол-во гемов</th>
              <th>Гемов сохранено</th>
              <th>
                <img src={wish} alt="" />
              </th>
              <th>Излишек</th>
              <th>
                <img src={wish} alt="" />
              </th>
              <th>Всего дней</th>
              <th>День сейчас</th>
              <th>Будет к концу</th>
              <th>Добавить еще</th>
            </tr>
          </thead>
          <tbody>
            {store.map((elem: storeItem, index: number) => {
              return <Hero {...elem} key={index + "storeItem"} />;
            })}
          </tbody>
        </table>
      ) : (
        <div className={s.itemsList}>
          {store.map((elem: storeItem, index: number) => {
            return <HeroCart {...elem} key={index + "storeItemCart"} />;
          })}
        </div>
      )}
    </div>
  );
};
