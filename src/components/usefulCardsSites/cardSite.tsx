import React from 'react'

import { getDownloadURL, listAll, ref } from 'firebase/storage'

import { storage } from '../../firebase'
import { UsefulSitesType } from '../../store/types/user'

import s from './styles.module.scss'
export const CardSite = ({ name, description, urlSite, urlImg }: UsefulSitesType) => {
  const [image, setImage] = React.useState('')

  const displayImage = async (urlImg: string) => {
    const listRef = ref(storage, `images/sites/`)
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name === urlImg) {
            getDownloadURL(itemRef).then((getURL) => {
              setImage(getURL)
            })
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    displayImage(urlImg)
  }, [urlImg])

  return (
    <div className={s.card} style={{ backgroundImage: `url(${image})` }}>
      <h3 className={s.nameCard}>{name || 'Нет названия'}</h3>
      {description ? <p className={s.description}>{description}</p> : ''}
      {urlSite ? (
        <a href={urlSite} target='_blank' rel='noreferrer' className={s.buttonRedirect}>
          Открыть
        </a>
      ) : (
        <span className={s.notFind}>Нет ссылки</span>
      )}
    </div>
  )
}
