import { useAppDispatch } from '../../../store/hooks'

import { addGemsItemStore } from '../../../store/slices/person'
import { storeItem } from '../../../store/types/items'

import { FieldsView } from './FieldsView'

type FieldsT = {
  id: string
  hero: storeItem
}

export const Fields = ({ hero }: FieldsT) => {
  const dispatch = useAppDispatch()

  const addPrimogems = (id: number, countGemsPlus: number) => {
    console.log(id, countGemsPlus)
    dispatch(addGemsItemStore({ id, countGemsPlus }))
  }

  return (
    <>
      <FieldsView hero={hero} addPrimogems={addPrimogems} />
    </>
  )
}
