import React from "react";

import s from "./header.module.scss";
import logo from "../../assets/logo.png";

import { Links } from "../../components/linksPages/Links";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthButton } from "./modalAuth/auth";
import { Site } from "../../const/routes";
import { ModalMenu } from "./burgerMenu/ModalMenu";
import { ThemeContext, themes } from "../../provider/context";
import { Toggle } from "../../components";

export const Header = () => {
  const [modalMenu, setModalMenu] = React.useState(false);

  React.useEffect(() => {
    //костыль
    if (document.body.offsetWidth < 450) {
      modalMenu ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
    }
  }, [modalMenu]);

  const toggleContextChange = (
    <ThemeContext.Consumer>
      {({ theme, setTheme }: any) => (
        <Toggle
          onChange={() => {
            if (theme === themes.light) setTheme(themes.dark);
            if (theme === themes.dark) setTheme(themes.light);
          }}
          value={theme === themes.dark}
        />
      )}
    </ThemeContext.Consumer>
  );

  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <div className={s.toggleNimg}>
          <Link to={Site} className={s.logo}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={s.context751}>{toggleContextChange}</div>
        </div>
        <div className={s.context750}>{toggleContextChange}</div>
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
