import React from 'react'
import s from './selectHero.module.scss'
import json from '../../../assets/heroes/heroes.json'
import { LoaderMini } from '../../index'

export const SelectHero = ({ setSelectImg, setViewListHeroes }: any) => {
  const lengthMas = json.heroes.length - 1
  let indexCounter = 0
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    if (lengthMas === indexCounter) {
      setLoader(false)
    }
  }, [indexCounter, lengthMas])
  const modalRef = React.useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setViewListHeroes(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return (
    <div className={s.wrapper} ref={modalRef}>
      {loader && <LoaderMini />}
      <div className={s.images}>
        {json.heroes.map((elem: any, index) => {
          indexCounter = index
          return (
            <img
              src={require('../../../assets/heroes/' + elem.img)}
              alt={elem.name}
              key={index + 'img'}
              onClick={() => {
                setSelectImg(elem.name)
                setViewListHeroes(false)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
