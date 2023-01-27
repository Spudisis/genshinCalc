import React from "react";
import s from "./modalAuth.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "../LoginForm/Auth";
import { Registration } from "../LoginForm/Registration";
import { GoogleAuth } from "../AuthGoogle/googleAuth";

export const ModalAuth = ({ setModalActive }: { setModalActive: (b: boolean) => void }) => {
  const [chooseForm, setChooseForm] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

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
  });
  return (
    <div className={s.modal} ref={modalRef}>
      <div className={s.wrapper}>
        <div className={s.buttons}>
          <button className={chooseForm ? "" : s.activeButton} onClick={() => setChooseForm(false)}>
            Войти
          </button>
          <button className={chooseForm ? s.activeButton : ""} onClick={() => setChooseForm(true)}>
            Регистрация
          </button>
          <button className={s.close} onClick={() => setModalActive(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {chooseForm ? <Registration /> : <Auth />}
        <GoogleAuth />
      </div>
    </div>
  );
};
