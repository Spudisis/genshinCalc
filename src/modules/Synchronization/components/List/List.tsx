import { Formik, Form, Field } from "formik";
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";

import s from "./List.module.scss";

import { ButtonSubmit } from "../../../../UI/Button/ButtonSubmit";
import { ErrorLabel } from "../../../../UI/ErrorLabel/ErrorLabel";
import { editSynchronization } from "../../api/Synchronization";
import { Button } from "../../../../UI/Button/Button";
import { editSynchro } from "../../store/reducer";

export type viewSync = {
  id: number;
  name: string;
  value: number;
  typeValue: string;
};

type props = {
  id: number;
  name: string;
  value: number;
  res: number;
  typeValue: string | null;
  createdAt: string;
  updatedAt: string;
  personId: number;
  sum: number;
};

export const List = ({ id, name, value, typeValue, res, personId, createdAt, updatedAt, sum }: props) => {
  const dispatch = useAppDispatch();

  const [type, setType] = React.useState(typeValue === "percent" ? true : false);
  const [saveStatus, setSaveStatus] = React.useState(false);

  const handleChangeType = (type: boolean) => {
    console.log(type);
    setType(type);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ id: id, name: name, value: value, typeValue: type ? "percent" : "prim" }}
      validate={(values: viewSync) => {
        const errors: any = {};
        if (values.value < 0 || !values.value) {
          errors.value = ">0";
        }

        if (type && +values.value - (typeValue === "percent" ? value : 0) + +sum > 100) {
          errors.value = "<100%";
        }
        return errors;
      }}
      onSubmit={async (values: viewSync) => {
        setSaveStatus(true);
        try {
          await editSynchronization(values);
          dispatch(
            editSynchro({
              id,
              name,
              value: values.value,
              typeValue: values.typeValue,
              res,
              personId,
              createdAt,
              updatedAt,
            })
          );
          setSaveStatus(false);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {() => (
        <Form>
          <li>
            <div className={s.groupInput}>{name}</div>
            <div className={s.groupInput}>
              <Field type="numeric" name="value" />
              <ErrorLabel nameId="value" />
            </div>
            <Button click={handleChangeType} name={type ? "%" : "прим."} param={!type} />

            {!saveStatus ? <ButtonSubmit name={"Сохранить"} /> : <div>Сохранение...</div>}
          </li>
        </Form>
      )}
    </Formik>
  );
};
