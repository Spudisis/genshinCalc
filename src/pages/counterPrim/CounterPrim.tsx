import { AdditionalActions, AddPrimogems, PrimoHistory } from '../../components'

import { Info } from './components/Info'

import s from '../style.module.scss'
export const CounterPrim = () => {
  return (
    <div className={s.root}>
      <Info />
      <AdditionalActions />
      <AddPrimogems />
      <PrimoHistory />
    </div>
  )
}
