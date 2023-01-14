import React from "react";
import s from "./pagination.module.scss";

type viewPagination = {
  page: number;
  index: number;
  setPageNumber: (n: number) => void;
};

export const PaginationView = ({ page, index, setPageNumber }: viewPagination) => {
  return (
    <button className={page === index + 1 ? s.activePage : s.changePage} onClick={() => setPageNumber(index)}>
      {index + 1}
    </button>
  );
};
