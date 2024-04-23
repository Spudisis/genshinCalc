import { useSelector } from 'react-redux'

import { HeroList } from '../../components/hero/HeroList/HeroList'
import { getPerson } from '../../store/slices/person'

import s from '../style.module.scss'

export const Main = () => {
  const { uid } = useSelector(getPerson)

  return <div className={s.root}>{uid && <HeroList />}</div>
}
