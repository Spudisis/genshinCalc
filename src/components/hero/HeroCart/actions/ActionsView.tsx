import { Link } from 'react-router-dom'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { heroCart } from '../../../../const/routes'

import s from '../HeroCart.module.scss'

interface ActionsViewTypes {
  deleteItem: boolean
  deleteCart: () => void
  setDeleteItem: (n: boolean) => void
  id: number
}

export const ActionsView = ({ deleteItem, deleteCart, setDeleteItem, id }: ActionsViewTypes) => {
  return (
    <div className={s.buttons}>
      <Link className={s.link} to={heroCart + id}>
        Подробнее
      </Link>

      {!deleteItem ? (
        <button onClick={() => setDeleteItem(true)}>
          <FontAwesomeIcon icon={faTrash as IconProp} />
        </button>
      ) : (
        <div className={s.buttonsDelete}>
          <button onClick={() => deleteCart()}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
          <button onClick={() => setDeleteItem(false)}>
            <FontAwesomeIcon icon={faXmark as IconProp} />
          </button>
        </div>
      )}
    </div>
  )
}
