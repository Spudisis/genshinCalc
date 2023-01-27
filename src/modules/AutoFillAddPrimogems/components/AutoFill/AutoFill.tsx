import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setAutoFill } from "../../store/reducer";

import s from "../../../../UI/ButtonAdditional/ButtonAdditional.module.scss";
import { getUsers } from "../../../../api/heros";

export const AutoFill = () => {
  const localstorage = useAppSelector((store) => store.persistedReducer.params);

  const dispatch = useAppDispatch();

  const handleChangeAutoFill = async (bool: boolean) => {
    dispatch(setAutoFill(bool));
  };
  return (
    <button
      className={`${s.buttonFill}  ${localstorage.autoFill ? s.autofill : s.autoFillNone}`}
      onClick={() => handleChangeAutoFill(!localstorage.autoFill)}
    >
      Автозаполнение
    </button>
  );
};
