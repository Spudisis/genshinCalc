import React from "react";

import s from "./HeroList.module.scss";
import wish from "../../../../assets/Objeto_Destino_entrelazado.webp";
import { storeItem } from "../../../../store/types/items";
import { Hero } from "../../../../components/HeroTable/HeroTable";
import { HeroCart } from "../../../../components/HeroCart/HeroCart";
import { CreateHero } from "../CreateHero/CreateHero";

interface HeroListViewTypes {
  store: storeItem[];

  setTypeView: (n: boolean) => void;
  typeView: boolean;
  locationWaitingPage: boolean;
}

export const HeroListView = ({ store, setTypeView, typeView, locationWaitingPage }: HeroListViewTypes) => {
  return (
    <div className={s.wrapper}>
      <div className={s.name}>
        <h2>Накопление</h2>
        <div className={s.buttons}>
          <button onClick={() => setTypeView(!typeView)}>Вид отображения: {typeView ? "Таблица" : "Карточки"}</button>
        </div>
      </div>

      {typeView ? (
        <div className={s.container}>
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
        </div>
      ) : (
        <div className={s.itemsList}>
          {store.map((elem: storeItem) => {
            return <HeroCart {...elem} key={elem.id} />;
          })}

          {locationWaitingPage && (
            <div className={s.item}>
              <CreateHero />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
