import { ErrorMessage } from "formik";
import React from "react";
import s from "./ErrorLabel.module.scss";

export const ErrorLabel = ({ nameId }: { nameId: string }) => {
  return <ErrorMessage name={nameId} component="div" className={s.error} />;
};
