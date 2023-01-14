import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PaginationView } from "./numberPage";
import s from "./pagination.module.scss";

type pagination = {
  pageCount: number;
  pageNumber: number;
  setPageNumber: (n: number) => void;
  setCountLine: (n: number) => void;
  countLine: number;
};

export const Pagination = ({ pageCount, pageNumber, setPageNumber, setCountLine, countLine }: pagination) => {
  const array = Array.from({ length: pageCount }, () => undefined);

  const [modalView, setModalView] = React.useState(false);

  const nextPage = () => {
    if (pageCount > pageNumber + 1) {
      setPageNumber(pageNumber + 1);
    }
  };
  const prevPage = () => {
    if (1 < pageNumber + 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const setLine = (number: number) => {
    setCountLine(number);
    setModalView(!modalView);
  };

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <button className={s.changePage} onClick={() => prevPage()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {array.map(
          (_: undefined, index: number) =>
            (index < 3 ||
              index > array.length - 4 ||
              index === pageNumber - 1 ||
              index === pageNumber + 1 ||
              index === pageNumber) && (
              <PaginationView index={index} page={pageNumber + 1} setPageNumber={setPageNumber} key={index} />
            )
        )}
        <button className={s.changePage} onClick={() => nextPage()}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className={s.setCountLine}>
        <button className={s.openModal} onClick={() => setModalView(!modalView)}>
          {countLine}&nbsp;&nbsp; записей
        </button>
        {modalView && (
          <div className={s.modalLinesChange}>
            <button onClick={() => setLine(5)}>5</button>
            <button onClick={() => setLine(10)}>10</button>
            <button onClick={() => setLine(15)}>15</button>
            <button onClick={() => setLine(25)}>25</button>
          </div>
        )}
      </div>
    </div>
  );
};
