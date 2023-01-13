import React from "react";
import { useAppSelector } from "../../store/hooks";
import { storeItem } from "../../store/types/items";
import { CalcBetween } from "../../utils";
import { NoticedCopy } from "./NoticedCopy/noticedCopy";
import { PrimoHistoryView } from "./PrimoHistoryView";

export type copy = {
  date: string;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
};

export const PrimoHistory = () => {
  const primogems = useAppSelector((store) => store.person.primogems);
  const store = useAppSelector((store) => store.person.store);
  const lastCalc = useAppSelector((store) => store.persistedReducer.params);
  const [reserve, setReserve] = React.useState(0);
  const [statusNoticed, setStatusNoticed] = React.useState(false);

  React.useEffect(() => {
    if (store && lastCalc.lastCalc) {
      const count = store.reduce((a: number, elem: storeItem) => CalcBetween(elem).countSave + a, 0);
      setReserve(count);
    } else {
      !lastCalc.lastCalc && setReserve(0);
    }
  }, [store, lastCalc]);

  const createClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter }: copy) => {
    try {
      await navigator.clipboard.writeText(
        `${date} у меня было ${countPrimogems} примогемов, ${countWishes} круток и ${countStarglitter} блеска`
      );

      setStatusNoticed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NoticedCopy status={statusNoticed} setStatus={setStatusNoticed} />
      <PrimoHistoryView primogem={primogems} createClipBoard={createClipBoard} reserve={reserve} />
    </>
  );
};
