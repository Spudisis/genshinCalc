import React from "react";
import s from "./LorePage.module.scss";
import { Lore } from "../../components";
import { useNavigate } from "react-router-dom";
import { Site } from "../../const/routes";
export const LorePage = () => {
  const [warning, setWarning] = React.useState(true);
  const redirect = useNavigate();
  return (
    <>
      {warning ? (
        <div className={s.warning}>
          <p>Требуется подгрузка изображений на ~60мб</p>
          <div>
            <button onClick={() => setWarning(!warning)}>Ок</button>
            <button onClick={() => redirect(Site)}>Отмена</button>
          </div>
        </div>
      ) : (
        <Lore />
      )}
    </>
  );
};
