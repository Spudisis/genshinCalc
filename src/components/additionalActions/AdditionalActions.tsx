import React, { useState } from 'react'

import starGlitter from '@/assets/Item_Masterless_Starglitter.webp'
import primogem from '@/assets/Item_Primogem.webp'
import wish from '@/assets/Objeto_Destino_entrelazado.webp'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAutoFill, setLastCalc } from '@/store/slices/localstorage'
import { addPrimogemsLastItem, addStarglitterLastItem, addWishLastItem } from '@/store/slices/primogems'
import { clsx } from 'clsx'

import { Button } from '@/shared/ui'

import { Sync } from '../sync/sync'

import s from './addActions.module.scss'

export const AdditionalActions = () => {
  const [isPositive, setIsPositive] = useState({
    primogems: true,
    wishes: true,
    starglitter: true
  })
  const localstorage = useAppSelector((store) => store.persistedReducer.params)
  const synchronization = useAppSelector((store) => store.syncSlice.synchro)

  const dispatch = useAppDispatch()

  const [modalSync, setModalSync] = React.useState(false)

  const handleChangeLastCalc = (bool: boolean) => {
    dispatch(setLastCalc(bool))
  }

  const handleChangeAutoFill = (bool: boolean) => {
    dispatch(setAutoFill(bool))
  }
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalSync(false)
    }
  }

  const addPrimogems = (n: number) => {
    if (!isPositive.primogems) {
      n = n * -1
    }
    dispatch(addPrimogemsLastItem(n))
  }

  const addWish = (n: number) => {
    if (!isPositive.wishes) {
      n = n * -1
    }
    dispatch(addWishLastItem(n))
  }
  const addStar = (n: number) => {
    if (!isPositive.starglitter) {
      n = n * -1
    }
    dispatch(addStarglitterLastItem(n))
  }

  return (
    <div className={clsx(s.additionalFunction, 'flex flex-col gap-2 py-2')}>
      <div className='flex flex-wrap gap-2'>
        <Button isActive={localstorage.autoFill} onClick={() => handleChangeAutoFill(!localstorage.autoFill)}>
          Автозаполнение
        </Button>
        <Button isActive={localstorage.lastCalc} onClick={() => handleChangeLastCalc(!localstorage.lastCalc)}>
          Последний расчет
        </Button>
        <div className={s.relative} ref={ref}>
          <button
            className={`${s.buttonFill}  ${modalSync || synchronization.length !== 0 ? s.autofill : s.autoFillNone}`}
            onClick={() => setModalSync(!modalSync)}
          >
            Синхронизация
          </button>
          {modalSync && <Sync />}
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button
          className='rounded-full'
          borderRadius='none'
          padding='none'
          isActive={!isPositive.primogems}
          onClick={() => setIsPositive((prev) => ({ ...prev, primogems: !prev.primogems }))}
        >
          <img src={primogem} className='w-auto h-8' />
        </Button>
        <Button onClick={() => addPrimogems(60)}>{isPositive.primogems ? '+' : '-'}60</Button>
        <Button onClick={() => addPrimogems(90)}>{isPositive.primogems ? '+' : '-'}90</Button>
        <Button onClick={() => addPrimogems(5)}>{isPositive.primogems ? '+' : '-'}5</Button>
        <Button onClick={() => addPrimogems(10)}>{isPositive.primogems ? '+' : '-'}10</Button>
        <Button onClick={() => addPrimogems(20)}>{isPositive.primogems ? '+' : '-'}20</Button>
        <Button onClick={() => addPrimogems(1)}>{isPositive.primogems ? '+' : '-'}1</Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button
          className='rounded-full'
          borderRadius='none'
          padding='none'
          isActive={!isPositive.wishes}
          onClick={() => setIsPositive((prev) => ({ ...prev, wishes: !prev.wishes }))}
        >
          <img src={wish} className='w-auto h-8' />
        </Button>
        <Button onClick={() => addWish(1)}>{isPositive.wishes ? '+' : '-'}1</Button>
        <Button onClick={() => addWish(2)}>{isPositive.wishes ? '+' : '-'}2</Button>
        <Button onClick={() => addWish(5)}>{isPositive.wishes ? '+' : '-'}5</Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button
          className='rounded-full'
          borderRadius='none'
          padding='none'
          isActive={!isPositive.starglitter}
          onClick={() => setIsPositive((prev) => ({ ...prev, starglitter: !prev.starglitter }))}
        >
          <img src={starGlitter} className='w-auto h-8' />
        </Button>
        <Button onClick={() => addStar(2)}>{isPositive.starglitter ? '+' : '-'}2</Button>
        <Button onClick={() => addStar(5)}>{isPositive.starglitter ? '+' : '-'}5</Button>
      </div>
    </div>
  )
}
