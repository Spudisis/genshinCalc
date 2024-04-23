import React from 'react'
import primogem from '@/assets/Item_Primogem.webp'
import wish from '@/assets/Objeto_Destino_entrelazado.webp'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setAutoFill, setLastCalc } from '../../store/slices/localstorage'
import { clsx } from 'clsx'
import { Sync } from '../sync/sync'
import s from './addActions.module.scss'
import { addPrimogemsLastItem, addWishLastItem } from '@/store/slices/primogems'

export const AdditionalActions = () => {
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
    dispatch(addPrimogemsLastItem(n))
  }

  const addWish = (n: number) => {
    dispatch(addWishLastItem(n))
  }

  return (
    <details className={s.details}>
      <summary>Дополнительные параметры</summary>
      <div className={clsx(s.additionalFunction, 'flex flex-col gap-2 py-2')}>
        <div className='flex flex-wrap gap-2'>
          <button
            className={`${s.buttonFill}  ${localstorage.autoFill ? s.autofill : s.autoFillNone}`}
            onClick={() => handleChangeAutoFill(!localstorage.autoFill)}
          >
            Автозаполнение
          </button>
          <button
            className={`${s.buttonFill}  ${localstorage.lastCalc ? s.autofill : s.autoFillNone}`}
            onClick={() => handleChangeLastCalc(!localstorage.lastCalc)}
          >
            Последний расчет
          </button>
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
          <div className='rounded-full border h-9 w-9 flex justify-center items-center'>
            <img src={primogem} className='w-auto h-8' />
          </div>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(60)}>
            +60
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(90)}>
            +90
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(5)}>
            +5
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(10)}>
            +10
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(20)}>
            +20
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addPrimogems(1)}>
            +1
          </button>
        </div>
        <div className='flex flex-wrap gap-2'>
          <div className='rounded-full border h-9 w-9 flex justify-center items-center'>
            <img src={wish} className='w-auto h-8' />
          </div>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addWish(1)}>
            +1
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addWish(2)}>
            +2
          </button>
          <button className={`${s.buttonFill}  ${s.autoFillNone}`} onClick={() => addWish(5)}>
            +5
          </button>
        </div>
      </div>
    </details>
  )
}
