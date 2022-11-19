import React from "react";
import s from "./header.module.scss";
import uraDavai from "../../assets/davaidavaiuraaa.png";
import { Links } from "../linksPages/Links";
import { ModalAuth } from "./modalAuth/modalAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPerson } from "../../redux/slices/person";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
export const Header = () => {
  const [modalActive, setModalActive] = React.useState(false);
  const { uid } = useSelector(getPerson);

  const [signOut, loading, error] = useSignOut(auth as any);
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <Link to="" className={s.logo}>
          <img src={uraDavai} alt="" />
        </Link>
        <div className={s.links}>
          <Links />
          {!uid ? (
            <div className={s.buttonOpenModal}>
              <button className={s.auth} onClick={() => setModalActive(!modalActive)}>
                Войти
              </button>
              {modalActive && <ModalAuth />}
            </div>
          ) : (
            <button className={s.auth} onClick={() => signOut()}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
