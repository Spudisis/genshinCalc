import { ErrorMessage } from "formik";
import { Field } from "formik";
import s from "./Style.module.scss";

export type inputBlockT = {
  id: string;
  nameId: string;
  placeholder: string;
  type: string;
  name: string;
};

export const InputBlock = ({ id, nameId, placeholder, type, name }: inputBlockT) => {
  return (
    <div className={s.inputBlock}>
      <label htmlFor={id + nameId}>{name}</label>
      <Field type={type} name={nameId} id={id + nameId} placeholder={placeholder} />
      <ErrorMessage name={nameId} component="div" className={s.errorMessage} />
    </div>
  );
};
