import React from "react";

import s from "./addPrimogems.module.scss";
import { FormAdd, valuesForm } from "../FormAdd/formAdd";
type FormAddPrimogems = {
  calcPrimogems: (primogems: valuesForm) => void;
  primogemsCount: number;
  wishCount: number;
  starglitterCount: number;
};

export const AddPrimogemsView = React.memo(
  ({ calcPrimogems, primogemsCount, wishCount, starglitterCount }: FormAddPrimogems) => {
    return (
      <div>
        <details className={s.addPrimogems}>
          <summary>Добавить</summary>
          <FormAdd
            calcPrimogems={calcPrimogems}
            primogemsCount={primogemsCount}
            wishCount={wishCount}
            starglitterCount={starglitterCount}
          />
        </details>
        <div className={s.addPrimogemsGeneral}>
          <FormAdd
            calcPrimogems={calcPrimogems}
            primogemsCount={primogemsCount}
            wishCount={wishCount}
            starglitterCount={starglitterCount}
          />
        </div>
      </div>
    );
  }
);
