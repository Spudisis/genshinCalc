import React from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Auth } from '../../../components/Auth/formAuth/auth'
import { Reg } from '../../../components/Auth/formAuth/reg'
import { GoogleAuth } from '../../../components/Auth/googleAuth/googleAuth'
import { auth } from '../../../firebase/index'
import { user } from '../../../store/types/user'

import s from './modalAuth.module.scss'

export const ModalAuth = ({ setModalActive }: any) => {
  const [chooseForm, setChooseForm] = React.useState(false)
  const modalRef = React.useRef<HTMLDivElement>(null)
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth as any)
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth as any)

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      console.log('modalhui')
      setModalActive(false)
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
        <div className={s.buttons}>
          <button className={chooseForm ? '' : s.activeButton} onClick={() => setChooseForm(false)}>
            Войти
          </button>
          <button className={chooseForm ? s.activeButton : ''} onClick={() => setChooseForm(true)}>
            Регистрация
          </button>
          <button className={s.close} onClick={() => setModalActive(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {chooseForm ? (
          <Reg createUser={({ email, password }: user) => createUserWithEmailAndPassword(email, password)} />
        ) : (
          <Auth signIn={({ email, password }: user) => signInWithEmailAndPassword(email, password)} />
        )}

        <GoogleAuth />
      </div>
    </div>
  )
}
