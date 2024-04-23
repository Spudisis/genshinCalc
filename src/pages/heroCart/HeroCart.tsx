import React from 'react'
import { useParams } from 'react-router-dom'

import { Fields, Image, PrimogemsViewCart } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { obj, setObj } from '../../store/slices/calcPrimogemObj'
import { storeItem } from '../../store/types/items'
import { CalcBetween } from '../../utils'

import s from '../style.module.scss'
import w from './HeroCart.module.scss'
export const HeroCart = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const id = params.id!
  const objectPrimogemsNewCalc = useAppSelector((state) => state.calcPrimogemObj.calculate)
  const [objPrimogems, setObjPrimogems] = React.useState<obj>()

  const store = useAppSelector((store) => store.person.store)

  const [sizeImg, setSizeImg] = React.useState<[T: number, U: number]>([0, 0])

  const [style, setStyle] = React.useState<string>('')

  const [hero, setHero] = React.useState<storeItem>()
  React.useEffect(() => {
    if (hero) {
      const setObjHero = (hero: storeItem) => {
        const count = CalcBetween(hero)
        if (count) {
          dispatch(setObj(count))
        }
      }
      setObjHero(hero)
    }
  }, [hero, dispatch])

  React.useEffect(() => {
    const hero = store.find((elem: storeItem) => elem.id === +id)
    hero && setHero(hero)
  }, [store, id])

  React.useLayoutEffect(() => {
    console.log(sizeImg)
    if (sizeImg[0] > sizeImg[1]) setStyle(w.vertically)
    if (sizeImg[0] < sizeImg[1]) setStyle(w.horizontally)
    if (sizeImg[0] === sizeImg[1]) setStyle('')
  }, [sizeImg])

  React.useEffect(() => {
    setObjPrimogems(objectPrimogemsNewCalc)
  }, [objectPrimogemsNewCalc])

  return (
    <div className={s.root}>
      <div className={style}>
        <Image id={id} setSizeImg={setSizeImg} />
        {hero && objPrimogems && <Fields hero={hero} id={id} />}
      </div>
      {objPrimogems && <PrimogemsViewCart obj={objPrimogems} />}
    </div>
  )
}
