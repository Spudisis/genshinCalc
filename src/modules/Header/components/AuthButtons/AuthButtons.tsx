import React from "react";
import s from "./AuthButtons.module.scss";
import { ModalAuth } from "../ModalAuth/modalAuth";

import { clearStore, clearUid, clearPrimogems } from "../../store/reducer";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ButtonAuth } from "../../../../UI/Button/ButtonAuth";
import { logout } from "../../api/userApi";

export const AuthButton = () => {
  const dispatch = useAppDispatch();
  const [modalAuthActive, setModalAuthActive] = React.useState(false);
  const id = useAppSelector((store) => store.person.id);

  React.useEffect(() => {
    console.log(modalAuthActive);
  }, [modalAuthActive]);
  const exit = () => {
    logout();
    dispatch(clearUid());
    dispatch(clearStore());
    dispatch(clearPrimogems());
  };

  const handleSetStatusModal = (b: boolean) => {
    setModalAuthActive(b);
  };

  return (
    <div>
      {!id ? (
        <div className={s.buttonOpenModal}>
          <ButtonAuth click={handleSetStatusModal} param={true} name={"Войти"} />
          {modalAuthActive && <ModalAuth setModalActive={(n: boolean) => setModalAuthActive(n)} />}
        </div>
      ) : (
        <div className={s.buttonOpenModal}>
          <ButtonAuth click={exit} param={""} name={"Выйти"} />
        </div>
      )}
    </div>
  );
};
