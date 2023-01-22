import React from "react";
import { useFormikContext } from "formik";
import { useAppDispatch } from "../../../store/hooks";
import { CalcBetween } from "../../../utils";
import { setObj } from "../../../store/slices/calcPrimogemObj";

export const FormObserver: React.FC = () => {
  const { values }: any = useFormikContext();
  const { date_start, date_end, countStart, countAdd, valueDayByDay, synchValue } = values;
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const calc = CalcBetween({ date_start, date_end, countStart, countAdd, valueDayByDay, synchValue });

    dispatch(setObj(calc));
  }, [values, dispatch]);

  return null;
};
