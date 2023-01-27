import React from "react";

import s from "./header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../Logo/Logo";
import { Links } from "../linksPages/Links";
import { ModalMenu } from "../ModalMenu/ModalMenu";
import { AuthButton } from "../AuthButtons/AuthButtons";
import { Toggle } from "../Toggle/Toggle";

export const Header = () => {
  const [modalMenu, setModalMenu] = React.useState(false);

  React.useEffect(() => {
    //костыль
    if (document.body.offsetWidth < 450) {
      modalMenu ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
    }
  }, [modalMenu]);

  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <div className={s.toggleNimg}>
          <Logo />
          <div className={s.context751}>
            <Toggle />
          </div>
        </div>
        <div className={s.context750}>
          <Toggle />
        </div>
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
