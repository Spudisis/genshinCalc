import React from 'react'

import { useAppSelector } from '../../store/hooks'
import { storeItem } from '../../store/types/items'
import { CalcBetween, copyClipBoard, findLocalStorageNumber, setItemLocalStorage } from '../../utils'
import { Pagination } from '../pagination/pagination'

import { NoticedCopy } from './NoticedCopy/noticedCopy'
import { PrimoHistoryView } from './promo-history-view'

export type copy = {
  date: string
  countPrimogems: number
  countWishes: number
  countStarglitter: number
  index: number
}

export type lineCount = 5 | 10 | 15 | 25

export const PrimoHistory = () => {
  const getLocalPageCount = findLocalStorageNumber('countLine')

  const primogems = useAppSelector((store) => store.primogemSlice.primogems)
  const store = useAppSelector((store) => store.person.store)
  const lastCalc = useAppSelector((store) => store.persistedReducer.params)

  const [reserve, setReserve] = React.useState(0)
  const [statusNoticed, setStatusNoticed] = React.useState(false)

  const [pageNumber, setPageNumber] = React.useState(0)
  const [pageCount, setPageCount] = React.useState(0)
  const [countLine, setCountLine] = React.useState<lineCount>(getLocalPageCount[1] ? getLocalPageCount[1] : 10)

  React.useEffect(() => {
    pageCount < pageNumber && setPageNumber(pageCount - 1)
  }, [pageCount, pageNumber])

  React.useEffect(() => {
    setItemLocalStorage('countLine', countLine)
  }, [countLine])

  React.useEffect(() => {
    setPageCount(Math.ceil(primogems.length / countLine))
  }, [primogems, countLine])

  React.useLayoutEffect(() => {
    if (store && lastCalc.lastCalc) {
      const count = store.reduce((a: number, elem: storeItem) => CalcBetween(elem).countSave + a, 0)
      setReserve(count)
    } else {
      !lastCalc.lastCalc && setReserve(0)
    }
  }, [store, lastCalc])

  const createClipBoard = async ({ date, countPrimogems, countWishes, countStarglitter, index }: copy) => {
    try {
      await copyClipBoard({ date, countPrimogems, countWishes, countStarglitter, index })
      setStatusNoticed(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NoticedCopy status={statusNoticed} setStatus={setStatusNoticed} />
      <PrimoHistoryView
        primogem={primogems.slice(pageNumber * countLine, (pageNumber + 1) * countLine)}
        createClipBoard={createClipBoard}
        reserve={reserve}
      />
      {primogems.length > countLine && (
        <Pagination
          pageCount={pageCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setCountLine={setCountLine}
          countLine={countLine}
        />
      )}
    </>
  )
}
