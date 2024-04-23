import React from 'react'
import debounce from 'lodash.debounce'
import { NoticedCopyView } from './noticedCopyView'

type notice = {
  status: boolean
  setStatus: (n: boolean) => void
}

export const NoticedCopy = ({ status, setStatus }: notice) => {
  const debounceFn = React.useMemo(
    () =>
      debounce(() => {
        setStatus(false)
      }, 3000),
    [setStatus]
  )
  React.useEffect(() => {
    status && debounceFn()
  }, [status, debounceFn])

  const clearDebounce = () => {
    debounceFn.cancel()
  }
  const addDebounce = () => {
    debounceFn()
  }
  return (
    <>
      {status && (
        <div>
          <NoticedCopyView setStatus={setStatus} clearDebounce={clearDebounce} addDebounce={addDebounce} />
        </div>
      )}
    </>
  )
}
