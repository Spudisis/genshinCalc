import { HeroList } from '../../components/hero/HeroList/HeroList'
import { useAppSelector } from '../../store/hooks'

import { Info } from './components/Info'

import s from '../style.module.scss'

export const CreateHero = () => {
  const uid = useAppSelector((state) => state.person.uid)
  return (
    <div className={s.root}>
      <Info />

      {uid && <HeroList />}
    </div>
  )
}
