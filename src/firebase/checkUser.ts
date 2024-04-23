import { checkPerson } from '../store/types/items'
import { firestore } from './config'
import { CreateUser } from './create/createUser'

import { getUserState } from './get/getUserState'
export const CheckUser = async ({ uid, dispatch }: checkPerson) => {
  const store = firestore.collection('userStore').doc(uid)
  const docs = await store.get()

  if (docs.exists) {
    getUserState({ docs, dispatch })
  } else {
    CreateUser({ uid, firestore })
  }
}
