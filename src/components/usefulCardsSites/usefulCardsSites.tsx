import React from "react";
import { GetSitesInfo } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AddSite } from "./addSite";
import { CardSite } from "./cardSite";
import s from "./styles.module.scss";
export const UsefulCardsSites = () => {
  const [modal, statusModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const Sites = useAppSelector((store) => store.usefulSites.Sites);
  const privilege = useAppSelector((store) => store.person.privilege);

  const getNewSites = () => {
    GetSitesInfo({ dispatch });
  };
  return (
    <div className={s.wrapper}>
      <div className={s.meta}>
        <h1>Полезные ссылки</h1>
        {privilege === "admin" && (
          <button onClick={() => statusModal(!modal)} className={s.button}>
            Добавить
          </button>
        )}
      </div>
      <div className={s.grid}>
        {Sites.length > 0 ? Sites.map((elem) => <CardSite key={elem.id} {...elem} />) : "Тут пуфто"}
      </div>

      {privilege === "admin" && modal && <AddSite statusModal={statusModal} getNewSites={getNewSites} />}
    </div>
  );
};
