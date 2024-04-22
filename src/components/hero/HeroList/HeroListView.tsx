
import s from "./HeroList.module.scss";
import wish from "../../../assets/Objeto_Destino_entrelazado.webp";
import { storeItem } from "../../../store/types/items";
import { Hero } from "../HeroTable/HeroTable";
import { HeroCart } from "../HeroCart/HeroCart";
import { CreateHero } from "../../CreateHero/CreateHero";
import { Site, waiting } from "../../../const/routes";

interface HeroListViewTypes {
  store: any;

  setTypeView: (n: boolean) => void;
  typeView: boolean;
  location: string;
}

export const HeroListView = ({ store, setTypeView, typeView, location }: HeroListViewTypes) => {
  const path = Site + waiting;

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

          {location === path && (
            <div className={s.item}>
              <CreateHero />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
