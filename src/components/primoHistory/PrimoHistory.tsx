import React from "react";
import { useAppSelector } from "../../store/hooks";
import { primogems } from "../../store/types/items";
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
  const [statusNoticed, setStatusNoticed] = React.useState(false);

  const createClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter }: copy) => {
    try {
      await navigator.clipboard.writeText(
        `${date} у меня было ${countPrimogems} примогемов, ${countWishes} круток и ${countStarglitter} блеска`
      );
      console.log("copy");
      setStatusNoticed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NoticedCopy status={statusNoticed} setStatus={setStatusNoticed} />
      <PrimoHistoryView primogem={primogems} createClipBoard={createClipBoard} />
    </>
  );
};
