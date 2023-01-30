import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getPrimogemsThunk, setCount, setPrimogems } from "../../../../store/slices/primogems";
import { primogems, storeItem } from "../../../../store/types/items";

import { CalcBetween, copyClipBoard, findLocalStorageNumber, setItemLocalStorage } from "../../../../utils";

import { getPrimogems } from "../../Api/Primogems";
import { Pagination } from "../../../../components/pagination/pagination";
import { NoticedCopy } from "../NoticedCopy/noticedCopy";
import { PrimoHistoryView } from "../PrimoHistoryView/PrimoHistoryView";

export type Copy = { index: number } & Pick<primogems, "valuePrimogems" | "valueWishes" | "valueStarglitter" | "date">;

export type lineCount = 5 | 10 | 15 | 25;

export const PrimoHistory = () => {
  const getLocalPageCount = findLocalStorageNumber("countLine");

  const dispatch = useAppDispatch();

  const uid = useAppSelector((store) => store.person.id);
  const primogems = useAppSelector((store) => store.primogemSlice.primogems);
  const Loading = useAppSelector((store) => store.primogemSlice.statusLoading);
  const rows = useAppSelector((store) => store.primogemSlice.count);
  const store = useAppSelector((store) => store.heroes.heroes);
  const lastCalc = useAppSelector((store) => store.persistedReducer.params);

  const [reserve, setReserve] = React.useState(0);
  const [statusNoticed, setStatusNoticed] = React.useState(false);

  const [pageNumberNow, setPageNumber] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [countLine, setCountLine] = React.useState<lineCount>(getLocalPageCount[1] ? getLocalPageCount[1] : 10);

  React.useEffect(() => {
    try {
      dispatch(getPrimogemsThunk({ uid, pageNumberNow, countLine }));
    } catch (error) {
      console.log(error);
    }
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

  React.useLayoutEffect(() => {
    if (store && lastCalc.lastCalc) {
      const count = store.reduce((a: number, elem: storeItem) => CalcBetween(elem).valueSave + a, 0);
      setReserve(count);
    } else {
      !lastCalc.lastCalc && setReserve(0);
    }
  }, [store, lastCalc]);

  const createClipBoard = async (copyData: Copy) => {
    try {
      await copyClipBoard(copyData);
      setStatusNoticed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NoticedCopy status={statusNoticed} setStatus={setStatusNoticed} />
      <PrimoHistoryView
        primogem={primogems}
        createClipBoard={createClipBoard}
        reserve={reserve}
        statusLoading={Loading}
      />
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
