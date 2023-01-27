import React from "react";
import { SyncModal } from "./components/SyncModal/SyncModal";
import { useAppSelector } from "./store/selectors";

import s from "../../UI/ButtonAdditional/ButtonAdditional.module.scss";

import { getSynchro } from "../../store/slices/synchronization";
import { useAppDispatch } from "../../store/hooks";
import { status } from "../../store/types/user";

export const SyncButton = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((store) => store.person.id);
  const [modalSync, setModalSync] = React.useState(false);
  const { synchro, statusSync } = useAppSelector((state) => state.syncSlice);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalSync(false);
    }
  };

  const handleOpen = () => {
    dispatch(getSynchro(id));
    setModalSync(!modalSync);
  };
  return (
    <div className={s.relative} ref={ref}>
      <button
        className={`${s.buttonFill}  ${modalSync || synchro.length !== 0 ? s.autofill : s.autoFillNone}`}
        onClick={() => handleOpen()}
      >
        Синхронизация
      </button>
      {modalSync && statusSync === status.FULFILLED && <SyncModal synchronization={synchro} />}
    </div>
  );
};
