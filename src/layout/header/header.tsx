import React from "react";
import s from "./header.module.scss";
import uraDavai from "../../assets/davaidavaiuraaa.png";
import { Links } from "../../components/linksPages/Links";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthButton } from "./modalAuth/auth";
import { Site } from "../../const/routes";
import { ModalMenu } from "./burgerMenu/ModalMenu";

export const Header = () => {
  const [modalMenu, setModalMenu] = React.useState(false);

  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <Link to={Site} className={s.logo}>
          <img src={uraDavai} alt="uraDavai" />
        </Link>
        <div className={s.links}>
          <Links />
          <AuthButton />
        </div>
        <div className={s.burgerMenu}>
          <FontAwesomeIcon icon={faBars} onClick={() => setModalMenu(!modalMenu)} />
          {modalMenu && <ModalMenu modalMenu={modalMenu} setModalMenu={setModalMenu} />}
        </div>
      </div>
    </header>
  );
};
