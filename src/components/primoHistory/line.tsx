import React from 'react'

import { DifferentCount } from './different-count'
import { ItemTable } from './item-table'
import { copy } from './promo-history'

type cartHistory = {
  id: number
  date: string
  dateTime: string
  countPrimogems: number
  countWishes: number
  countStarglitter: number
  differenceCountPrimogems: number
  differenceCountWishes: number
  differenceCountStarglitter: number
  createClipBoard: (n: copy) => void
  reserve: number
  index: number
}
export const LineTable = React.memo(
  ({
    date,
    dateTime,
    countPrimogems,
    countWishes,
    countStarglitter,
    differenceCountPrimogems,
    differenceCountWishes,
    differenceCountStarglitter,
    createClipBoard,
    reserve,
    index
  }: cartHistory) => {
    return (
      <div
        className='grid grid-cols-4 h-12 border-l border-r border-black border-b dark:border-555555 transition cursor-pointer hover:text-white hover:bg-grayDark'
        style={{ gridColumn: '1/-1' }}
        onClick={() => createClipBoard({ date, countPrimogems, countWishes, countStarglitter, index })}
      >
        <ItemTable>
          {date} {dateTime && dateTime}
        </ItemTable>
        <ItemTable>
          <div>
            {countPrimogems}
            {reserve > 0 && (
              <span>
                (-{reserve}={countPrimogems - reserve})
              </span>
            )}
          </div>
          <DifferentCount count={differenceCountPrimogems} />
        </ItemTable>
        <ItemTable>
          <div>{countWishes}</div>
          <DifferentCount count={differenceCountWishes} />
        </ItemTable>
        <ItemTable border={false}>
          <div>{+countStarglitter}</div>
          <DifferentCount count={differenceCountStarglitter} />
        </ItemTable>
      </div>
    )
  }
)
