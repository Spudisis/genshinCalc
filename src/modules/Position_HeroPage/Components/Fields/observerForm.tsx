import React from "react";
import { useFormikContext } from "formik";
import { useAppDispatch } from "../../../../store/hooks";
import { CalcBetween } from "../../../../utils";
import { setObj } from "../../../../store/slices/calcPrimogemObj";
import { storeItem } from "../../../../store/types/items";

export const FormObserver: React.FC = () => {
  const values: storeItem = useFormikContext();
  const { date_start, date_end, valueStart, valueAdd, Synchronization, valueDayByDays, valueWishes } = values;
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (date_start) {
      const calc = CalcBetween({
        date_start,
        date_end,
        valueStart,
        valueAdd,
        Synchronization,
        valueDayByDays,
        valueWishes,
      });
      dispatch(setObj(calc));
    }
  }, [values, dispatch]);

  return null;
};
