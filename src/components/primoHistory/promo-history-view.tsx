import React from 'react'

import starglitter from '../../assets/Item_Masterless_Starglitter.webp'
import primogemImg from '../../assets/Item_Primogem.webp'
import wish from '../../assets/Objeto_Destino_entrelazado.webp'
import { primogems } from '../../store/types/items'

import { ItemTable } from './item-table'
import { LineTable } from './line'
import { copy } from './promo-history'

export type PrimoHistoryViewProps = {
  primogem: primogems[]
  createClipBoard: (n: copy) => void
  reserve: number
}
export const PrimoHistoryView = React.memo(({ primogem, createClipBoard, reserve }: PrimoHistoryViewProps) => {
  const lines = primogem.map((obj, index) => (
    <LineTable
      id={obj.id}
      date={obj.date}
      dateTime={obj.dateTime ? obj.dateTime : ''}
      countPrimogems={obj.countPrimogems}
      countWishes={obj.countWishes}
      countStarglitter={obj.countStarglitter}
      differenceCountPrimogems={obj.differenceCountPrimogems}
      differenceCountWishes={obj.differenceCountWishes}
      differenceCountStarglitter={obj.differenceCountStarglitter}
      createClipBoard={createClipBoard}
      reserve={index === 0 ? reserve : 0}
      index={index}
      key={obj.id}
    />
  ))

  return (
    <div className='overflow-hidden overflow-x-auto'>
      <div className='w-[980px] lg:w-full '>
        <div className='grid grid-cols-4 justify-center h-12 items-center border dark:border-555555 border-black rounded-tl-lg rounded-tr-lg overflow-hidden'>
          <ItemTable>Дата</ItemTable>
          <ItemTable>
            <img src={primogemImg} className='h-8 w-auto' alt='primogemImg' />
          </ItemTable>
          <ItemTable>
            <img src={wish} className='h-8 w-auto' alt='wish' />
          </ItemTable>
          <ItemTable border={false}>
            <img src={starglitter} className='h-8 w-auto' alt='starglitter' />
          </ItemTable>
        </div>

        <div className='grid grid-cols-4'>{lines}</div>
      </div>
    </div>
  )
})
