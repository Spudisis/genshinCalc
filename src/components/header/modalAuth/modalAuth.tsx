import React from "react";
import s from "./modalAuth.module.scss";

import { Reg } from "../../formAuth/reg";
import { Auth } from "../../formAuth/auth";
import { GoogleAuth } from "../../googleAuth/googleAuth";

import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { user } from "../../../redux/types/user";
import { PopupClick } from "../../../redux/types/refs";
export const ModalAuth = ({ setModalActive }: any) => {
  const [chooseForm, setChooseForm] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [createUserWithEmailAndPassword, userReg, loadingReg, errorReg] = useCreateUserWithEmailAndPassword(
    auth as any
  );
  const [signInWithEmailAndPassword, userLog, loadingLog, errorLog] = useSignInWithEmailAndPassword(auth as any);

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalActive(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div className={s.modal} ref={modalRef}>
      <div className={s.buttons}>
        <button className={chooseForm ? s.inactiveButton : s.activeButton} onClick={() => setChooseForm(false)}>
          Войти
        </button>
        <button className={chooseForm ? s.activeButton : s.inactiveButton} onClick={() => setChooseForm(true)}>
          Регистрация
        </button>
      </div>
      {chooseForm ? (
        <Reg createUser={({ email, password }: user) => createUserWithEmailAndPassword(email, password)} />
      ) : (
        <Auth signIn={({ email, password }: user) => signInWithEmailAndPassword(email, password)} />
      )}
      <GoogleAuth />
    </div>
  );
};
