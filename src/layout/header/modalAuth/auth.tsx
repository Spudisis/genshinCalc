import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { Button } from '@/shared/ui'

import { auth } from '../../../firebase'
import { useAppDispatch } from '../../../store/hooks'
import { clearStore, clearUid, getPerson } from '../../../store/slices/person'
import { clearPrimogems } from '../../../store/slices/primogems'

import { ModalAuth } from './modalAuth'

export const AuthButton = () => {
  const dispatch = useAppDispatch()
  const [modalAuthActive, setModalAuthActive] = React.useState(false)
  const { uid } = useSelector(getPerson)
  const [signOut] = useSignOut(auth as any)

  React.useEffect(() => {
    console.log(modalAuthActive)
  }, [modalAuthActive])
  const exit = () => {
    dispatch(clearStore())
    dispatch(clearPrimogems())
    dispatch(clearUid())
    signOut()
  }
  return (
    <>
      {!uid ? (
        <div className='relative'>
          <Button className='mt-1 md:mt-0 w-full  md:w-auto md:ml-1 xl:ml-2' onClick={() => setModalAuthActive(true)}>
            Войти
          </Button>
          {modalAuthActive && <ModalAuth setModalActive={(n: boolean) => setModalAuthActive(n)} />}
        </div>
      ) : (
        <Button className='mt-1 md:mt-0 w-full md:w-auto md:ml-1 xl:ml-2' onClick={() => exit()}>
          Выйти
        </Button>
      )}
    </>
  )
}
