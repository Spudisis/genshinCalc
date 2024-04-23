import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { getPerson } from '../../../store/slices/person'
import { findLocalStorage } from '../../../utils/'

import { HeroListView } from './HeroListView'
export const HeroList = () => {
  const typeLocal = findLocalStorage('typeView')

  const { store } = useSelector(getPerson)
  const [typeView, setTypeView] = React.useState(typeLocal[1])
  const location = useLocation()

  const setLocalStorage = (boolean: boolean) => {
    setTypeView(boolean)
    localStorage.setItem('typeView', JSON.stringify(boolean))
  }

  React.useEffect(() => {
    !typeLocal[0] && localStorage.setItem('typeView', JSON.stringify(typeView))
  }, [typeLocal, typeView])

  return <HeroListView store={store} setTypeView={setLocalStorage} typeView={typeView} location={location.pathname} />
}
