import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Lore } from '../../components'
import { Site } from '../../const/routes'

import s from './LorePage.module.scss'
export const LorePage = () => {
  const [warning, setWarning] = React.useState(true)
  const redirect = useNavigate()
  return (
    <>
      {warning ? (
        <div className={s.warning}>
          <p>Требуется подгрузка изображений на ~60мб</p>
          <div>
            <button onClick={() => setWarning(!warning)}>Ок</button>
            <button onClick={() => redirect(Site)}>Отмена</button>
          </div>
        </div>
      ) : (
        <Lore />
      )}
    </>
  )
}
