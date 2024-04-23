import React from 'react'

import { useAppSelector } from '../../../store/hooks'
import { storeItem } from '../../../store/types/items'
import { ImageContain } from '../../hero/HeroCart/components/imageContain'

import s from './Image.module.scss'

type Img = {
  id: string
  setSizeImg: ([n, b]: [T: number, U: number]) => void
}

export const Image = ({ id, setSizeImg }: Img) => {
  const uid = useAppSelector((state) => state.person.uid)
  const store = useAppSelector((store) => store.person.store)
  const [cart, setCart] = React.useState<storeItem>()
  // eslint-disable-next-line
  const [_, setImageFirebase] = React.useState(false)

  React.useEffect(() => {
    const cart = store.find((elem: storeItem) => id && elem.id === +id)
    if (cart) setCart(cart)
  }, [store, id])

  return (
    <>
      {cart && cart.image && (
        <div className={s.image}>
          <ImageContain uid={uid} image={cart.image} setImageFirebase={setImageFirebase} setSizeImg={setSizeImg} />
        </div>
      )}
    </>
  )
}
