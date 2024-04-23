import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import s from './Noticed.module.scss'

type viewNotice = {
  clearDebounce: () => void
  setStatus: (n: boolean) => void
  addDebounce: () => void
}

export const NoticedCopyView = ({ setStatus, clearDebounce, addDebounce }: viewNotice) => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const current = ref.current
    if (ref && current) {
      current.addEventListener('mouseover', clearDebounce)
      current.addEventListener('mouseout', addDebounce)
    }
    return () => {
      if (ref && current) {
        current.removeEventListener('mouseover', clearDebounce)
        current.removeEventListener('mouseout', addDebounce)
      }
    }
  })
  return (
    <div className={s.wrapper} ref={ref}>
      <div className={s.line}>
        Оповещение
        <button className={s.close} onClick={() => setStatus(false)}>
          <FontAwesomeIcon icon={faXmark as IconProp} />
        </button>
      </div>
      <div className={s.line}>
        <div className={s.info}>Информация скопирована в буфер обмена</div>

        <button className={s.hide}>Подробнее</button>
      </div>
    </div>
  )
}
