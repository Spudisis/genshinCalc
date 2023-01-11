import React from "react";
import _ from "lodash.debounce";
import { NoticedCopyView } from "./noticedCopyView";

type notice = {
  status: boolean;
  setStatus: (n: boolean) => void;
};

export const NoticedCopy = ({ status, setStatus }: notice) => {
  const closeModal = () => {
    setStatus(false);
  };
  const debounceFn = React.useCallback(_(closeModal, 3000), []);
  React.useEffect(() => {
    status && debounceFn();
  }, [status]);

  const clearDebounce = () => {
    debounceFn.cancel();
  };
  const addDebounce = () => {
    debounceFn();
  };
  return (
    <>
      {status && (
        <div>
          <NoticedCopyView setStatus={setStatus} clearDebounce={clearDebounce} addDebounce={addDebounce} />
        </div>
      )}
    </>
  );
};
