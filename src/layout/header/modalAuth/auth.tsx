import React from "react";
import { ModalAuth } from "./modalAuth";
import s from "./buttonAuth.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearStore, clearUid, getPerson } from "../../../store/slices/person";

import { clearPrimogems } from "../../../store/slices/primogems";

export const AuthButton = () => {
  const dispatch = useAppDispatch();
  const [modalAuthActive, setModalAuthActive] = React.useState(false);
  const uid = useAppSelector((store) => store.person.uid);

  React.useEffect(() => {
    console.log(modalAuthActive);
  }, [modalAuthActive]);
  const exit = () => {
    dispatch(clearUid());
    dispatch(clearStore());
    dispatch(clearPrimogems());
  };
  return (
    <>
      {!uid ? (
        <div className={s.buttonOpenModal}>
          <button className={s.auth} onClick={() => setModalAuthActive(true)}>
            Войти
          </button>
          {modalAuthActive && <ModalAuth setModalActive={(n: boolean) => setModalAuthActive(n)} />}
        </div>
      ) : (
        <button className={s.auth} onClick={() => exit()}>
          Выйти
        </button>
      )}
    </>
  );
};
