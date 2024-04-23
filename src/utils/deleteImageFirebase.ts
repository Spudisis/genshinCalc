import { deleteObject, ref } from 'firebase/storage'

import { storage } from '../firebase'

type deleteImage = {
  uid: any
  image: string
}

export const deleteImageFirebase = async ({ uid, image }: deleteImage) => {
  const deleteRef = ref(storage, `images/${uid}/${image}`)
  await deleteObject(deleteRef)
    .then(() => {
      console.log('удалено')
    })
    .catch(() => {
      console.log('ошибка')
    })
}
