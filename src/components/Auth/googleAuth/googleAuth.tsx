import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import s from "./google.module.scss";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export const GoogleAuth = () => {
  // onClick={() => signInWithGoogle()}
  return (
    <button className={s.button}>
      Войти через google <FontAwesomeIcon icon={faGoogle as IconProp} />
    </button>
  );
};
