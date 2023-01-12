import React from "react";
import { ModalAuth } from "./modalAuth";
import s from "./buttonAuth.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { clearStore, clearUid, getPerson } from "../../../store/slices/person";
import { useSignOut } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";

export const AuthButton = () => {
  const dispatch = useAppDispatch();
  const [modalAuthActive, setModalAuthActive] = React.useState(false);
  const { uid } = useSelector(getPerson);
  const [signOut, loading, error] = useSignOut(auth as any);

  React.useEffect(() => {
    console.log(modalAuthActive);
  }, [modalAuthActive]);
  const exit = () => {
    dispatch(clearStore());
    dispatch(clearUid());
    signOut();
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
