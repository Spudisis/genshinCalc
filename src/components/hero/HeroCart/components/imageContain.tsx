import React from 'react'

import { getDownloadURL, listAll, ref } from 'firebase/storage'

import error from '../../../../assets/errorImg.png'
import { storage } from '../../../../firebase'
import { FindImage } from '../../../../utils'

type Contain = {
  image: string

  setImageFirebase: (n: boolean) => void
  uid: any
  setSizeImg: (([n, b]: [T: number, U: number]) => void) | undefined
}

export const ImageContain = ({ image, setImageFirebase, uid, setSizeImg }: Contain) => {
  const refImg = React.useRef<HTMLImageElement>(null)

  const [imageFind, setImagefind] = React.useState(false) //проверка откуда изображаение fasle-ссылкой, true-с json'а
  const [imageCheck, setImageCheck] = React.useState(image) //отсюда берется изображение (ссылка или название)

  const onLoadImg = () => {
    if (refImg && refImg.current && setSizeImg) {
      setSizeImg([refImg.current.naturalHeight, refImg.current.naturalWidth])
    }
  }

  React.useEffect(() => {
    //Откуда картинка
    const a = FindImage(image)
    const displayImage = async (image: string) => {
      const listRef = ref(storage, `images/${uid}/`)
      await listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            if (itemRef.name === image) {
              getDownloadURL(itemRef).then((getURL) => {
                setImageFirebase(true)
                setImageCheck(getURL)
              })
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //если картинка с Json
    if (a) {
      setImagefind(true)
      setImageCheck(a.img)
      //если с firebase
    } else {
      setImagefind(false)
      setImageCheck(image)
      //если картинка ссылкой
      displayImage(image)
    }
  }, [image, uid, setImageFirebase])

  return (
    <img
      ref={refImg}
      src={imageFind ? require('../../../../assets/heroes/' + imageCheck) : imageCheck}
      alt=''
      onError={() => setImageCheck(error)}
      onLoad={() => onLoadImg()}
    />
  )
}
