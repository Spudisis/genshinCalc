import { AdditionalActions, AddPrimogems, PrimoHistory } from '../../components'

import { Info } from './components/Info'

import s from '../style.module.scss'
export const CounterPrim = () => {
  return (
    <div className={s.root}>
      <Info />
      <div className='grid sm:grid-cols-2 my-5 grid-cols-1 gap-4 place-items-center'>
        <AdditionalActions />
        <AddPrimogems />
      </div>
      <PrimoHistory />
    </div>
  )
}
