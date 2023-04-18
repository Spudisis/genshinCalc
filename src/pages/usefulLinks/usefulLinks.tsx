import React from "react";
import { UsefulCardsSites } from "../../components";
import { GetSitesInfo } from "../../firebase";
import { useAppDispatch } from "../../store/hooks";
import s from "../style.module.scss";
export const UsefulLinks = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    GetSitesInfo({ dispatch });
  }, [dispatch]);

  return (
    <div className={s.root}>
      <UsefulCardsSites />
    </div>
  );
};
