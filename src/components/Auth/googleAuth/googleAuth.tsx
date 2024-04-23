import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import s from './google.module.scss'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/index'
export const GoogleAuth = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth as any)
  return (
    <button className={s.button} onClick={() => signInWithGoogle()}>
      Войти через google <FontAwesomeIcon icon={faGoogle as IconProp} />
    </button>
  )
}
