import React from 'react'

import { UpdateStore } from '../../firebase'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addPrimogems } from '../../store/slices/primogems'
import { calcChangePrimogems } from '../../utils'
import { AddPrimogemsView } from './AddPrimogemsView'

export type objForm = {
  countPrimogems: number
  countWishes: number
  countStarglitter: number
}

export const AddPrimogems = () => {
  const { uid, store } = useAppSelector((state) => state.person)
  const { primogems, lastItem } = useAppSelector((state) => state.primogemSlice)
  const synchro = useAppSelector((state) => state.syncSlice.synchro)
  const fill = useAppSelector((store) => store.persistedReducer.params)
  const dispatch = useAppDispatch()

  const [primogemsCount, setPrimogemsCount] = React.useState(0)
  const [wishCount, setWishCount] = React.useState(0)
  const [starglitterCount, setStarglitterCount] = React.useState(0)

  React.useLayoutEffect(() => {
    if (fill.autoFill && lastItem) {
      setPrimogemsCount(lastItem.countPrimogems)
      setWishCount(lastItem.countWishes)
      setStarglitterCount(lastItem.countStarglitter)
    } else {
      setPrimogemsCount(0)
      setWishCount(0)
      setStarglitterCount(0)
    }
  }, [fill.autoFill, lastItem])

  React.useEffect(() => {
    uid && primogems.length !== 0 && UpdateStore({ uid, store, primogems, synchro })
  }, [primogems, uid, store, synchro])

  const calcPrimogems = (obj: objForm) => {
    const objectFull = calcChangePrimogems(obj, primogems)
    dispatch(addPrimogems(objectFull))
  }

  return (
    <AddPrimogemsView
      calcPrimogems={calcPrimogems}
      primogemsCount={primogemsCount}
      wishCount={wishCount}
      starglitterCount={starglitterCount}
    />
  )
}
