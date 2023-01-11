import React from "react";
import s from "./header.module.scss";
import uraDavai from "../../assets/davaidavaiuraaa.png";
import { Links } from "../../components/linksPages/Links";
import { ModalAuth } from "./modalAuth/modalAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearStore, clearUid, getPerson } from "../../store/slices/person";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/index";
import { useAppDispatch } from "../../store/hooks";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = React.useState(false);
  const { uid } = useSelector(getPerson);

  const [signOut, loading, error] = useSignOut(auth as any);

  const exit = () => {
    dispatch(clearStore());
    dispatch(clearUid());
    signOut();
  };

  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <Link to="genshinCalc/" className={s.logo}>
          <img src={uraDavai} alt="" />
        </Link>
        <div className={s.links}>
          <Links />
          {!uid ? (
            <div className={s.buttonOpenModal}>
              <button className={s.auth} onClick={() => setModalActive(true)}>
                Войти
              </button>
              {modalActive && <ModalAuth setModalActive={(n: any) => setModalActive(n)} />}
            </div>
          ) : (
            <button className={s.auth} onClick={() => exit()}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
