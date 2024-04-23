import React from 'react'

import { objForm } from './AddPrimogems'
import s from './addPrimogems.module.scss'
import { FormAdd } from './formAdd'
type FormAddPrimogems = {
  calcPrimogems: (primogems: objForm) => void
  primogemsCount: number
  wishCount: number
  starglitterCount: number
}

export const AddPrimogemsView = React.memo(({ calcPrimogems, primogemsCount, wishCount, starglitterCount }: FormAddPrimogems) => {
  return (
    <div>
      <details className={s.addPrimogems}>
        <summary>Добавить</summary>
        <FormAdd calcPrimogems={calcPrimogems} primogemsCount={primogemsCount} wishCount={wishCount} starglitterCount={starglitterCount} />
      </details>
      <div className={s.addPrimogemsGeneral}>
        <FormAdd calcPrimogems={calcPrimogems} primogemsCount={primogemsCount} wishCount={wishCount} starglitterCount={starglitterCount} />
      </div>
    </div>
  )
})
