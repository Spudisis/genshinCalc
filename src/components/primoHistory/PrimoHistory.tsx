import React from "react";
import { getPrimogems } from "../../api/primogems";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCount, setPrimogems } from "../../store/slices/primogems";
import { storeItem } from "../../store/types/items";
import { CalcBetween, copyClipBoard, findLocalStorageNumber, setItemLocalStorage } from "../../utils";
import { Pagination } from "../pagination/pagination";
import { NoticedCopy } from "./NoticedCopy/noticedCopy";
import { PrimoHistoryView } from "./PrimoHistoryView";

export type copy = {
  date: string;
  countPrimogems: number;
  countWishes: number;
  countStarglitter: number;
  index: number;
};

export type lineCount = 5 | 10 | 15 | 25;

export const PrimoHistory = () => {
  const getLocalPageCount = findLocalStorageNumber("countLine");
  const dispatch = useAppDispatch();
  const uid = useAppSelector((store) => store.person.id);
  const primogems = useAppSelector((store) => store.primogemSlice.primogems);
  const rows = useAppSelector((store) => store.primogemSlice.count);
  const store = useAppSelector((store) => store.heroes.heroes);
  const lastCalc = useAppSelector((store) => store.persistedReducer.params);

  const [reserve, setReserve] = React.useState(0);
  const [statusNoticed, setStatusNoticed] = React.useState(false);

  const [pageNumberNow, setPageNumber] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [countLine, setCountLine] = React.useState<lineCount>(getLocalPageCount[1] ? getLocalPageCount[1] : 10);

  React.useEffect(() => {
    const loadPrimogems = async (pageNumberNow: number, countLine: number) => {
      try {
        const data = await getPrimogems({ uid, pageNumberNow, countLine });
        dispatch(setPrimogems(data.rows));
        dispatch(setCount(data.count));
        console.log("aa");
      } catch (error) {
        console.log(error);
      }
    };
    loadPrimogems(pageNumberNow, countLine);
  }, [pageNumberNow, countLine]);

  React.useEffect(() => {
    pageCount < pageNumberNow && setPageNumber(pageCount - 1);
  }, [pageCount, pageNumberNow]);

  React.useEffect(() => {
    setItemLocalStorage("countLine", countLine);
  }, [countLine]);

  React.useEffect(() => {
    setPageCount(Math.ceil(rows / countLine));
  }, [rows, countLine]);

  // React.useLayoutEffect(() => {
  //   if (store && lastCalc.lastCalc) {
  //     const count = store.reduce((a: number, elem: storeItem) => CalcBetween(elem).countSave + a, 0);
  //     setReserve(count);
  //   } else {
  //     !lastCalc.lastCalc && setReserve(0);
  //   }
  // }, [store, lastCalc]);

  const createClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter, index }: copy) => {
    try {
      await copyClipBoard({ date, countPrimogems, countWishes, countStarglitter, index });
      setStatusNoticed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NoticedCopy status={statusNoticed} setStatus={setStatusNoticed} />
      <PrimoHistoryView primogem={primogems} createClipBoard={createClipBoard} reserve={reserve} />
      {rows > countLine && (
        <Pagination
          pageCount={pageCount}
          pageNumber={pageNumberNow}
          setPageNumber={setPageNumber}
          setCountLine={setCountLine}
          countLine={countLine}
        />
      )}
    </>
  );
};
