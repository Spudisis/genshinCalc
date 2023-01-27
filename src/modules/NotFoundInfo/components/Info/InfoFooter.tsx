import React from "react";
import { useNavigate } from "react-router-dom";
import { Site } from "../../../../const/routes";
import { Button } from "../../../../UI/Button/Button";

import s from "./Info.module.scss";

export const InfoFooter = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(Site);
  };
  return (
    <div className={s.info}>
      <div>Страница не найдена</div>
      <Button name={"Вернуться"} click={handleClick} param={""} />
    </div>
  );
};
