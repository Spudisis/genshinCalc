import React from 'react'
import { Link } from 'react-router-dom'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from '../../../assets/logo.png'
import { Links } from '../../../components'
import { Site } from '../../../const/routes'
import { AuthButton } from '../modalAuth/auth'

import s from './ModalMenu.module.scss'
type modal = {
  modalMenu: boolean
  setModalMenu: (n: boolean) => void
}

export const ModalMenu = ({ modalMenu, setModalMenu }: modal) => {
  const modalRef = React.useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalMenu(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return (
    <div className={s.modal} ref={modalRef}>
      <div className={s.wrapper}>
        <button className={s.close} onClick={() => setModalMenu(!modalMenu)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <Link to={Site} className={s.logo} onClick={() => setModalMenu(!modalMenu)}>
          <img src={logo} alt='logo' />
        </Link>

        <div onClick={() => setModalMenu(!modalMenu)}>
          <Links />
        </div>
        <AuthButton />
      </div>
    </div>
  )
}
