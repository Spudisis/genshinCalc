import React from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from '../HeroCart.module.scss'

type Inputs = {
  handleChange: (n: React.FormEvent<HTMLInputElement>) => void
  handleAdd: (n: React.FormEvent<HTMLInputElement>) => void
  sendAdd: () => void
  countGemsPlus: number
  initialCount: number
}

export const InputsCart = ({ handleChange, initialCount, handleAdd, countGemsPlus, sendAdd }: Inputs) => {
  return (
    <div className={s.inputs}>
      <div className={s.countPrimo}>
        <label htmlFor='gemsNow'>Сколько гемов</label>
        <input
          type='number'
          id='gemsNow'
          value={initialCount}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
          placeholder='Количество'
        />
      </div>

      <div className={s.addGems}>
        <label htmlFor='gemsAdd'>Сколько добавить</label>
        <div className={s.buttonInput}>
          <input type='number' id='gemsAdd' onChange={(e: React.FormEvent<HTMLInputElement>) => handleAdd(e)} placeholder='Добавить' />
          <button onClick={() => sendAdd()} disabled={countGemsPlus ? false : true}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
        </div>
      </div>
    </div>
  )
}
