import { ErrorMessage } from "formik";
import { Field } from "formik";
import s from "./AddHeroInput.module.scss";

type AddHero = {
  id: string;
  nameId: string;
  dndFunc: (n: boolean) => void;
  dndRes: boolean;
  placeHolder: string;
  name: string;
  type: string;
  textModal: string;
};

export const AddHeroInput = ({ id, nameId, dndFunc, dndRes, placeHolder, name, type, textModal }: AddHero) => {
  return (
    <div className={s.inputBlock}>
      {textModal ? (
        <label htmlFor={id + nameId} onMouseEnter={() => dndFunc(true)} onMouseLeave={() => dndFunc(false)}>
          {name}
        </label>
      ) : (
        <label htmlFor={id + nameId}>{name}</label>
      )}
      <Field type={type} name={nameId} id={id + nameId} placeholder={placeHolder} />
      <ErrorMessage name={nameId} component="div" className={s.errorMessage} />
      {dndRes && (
        <div className={s.infoSide}>
          <p>{textModal}</p>
        </div>
      )}
    </div>
  );
};
