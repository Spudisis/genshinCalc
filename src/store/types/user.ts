import { primogems, storeItem, Synchronization } from './items'

export type user = {
  email: string
  password: string
}

export type personSlice = {
  uid: string
  store: storeItem[]
  privilege: string
}

export type primogemsSlice = {
  primogems: primogems[]
  lastItem: primogems | null
}

export type allSlice = {
  uid: string
  store: storeItem[]
  primogems: primogems[]
  synchro: Synchronization[]
}

export type synchroSlice = {
  synchro: Synchronization[]
}

export type UsefulSitesType = {
  name: string
  id: string
  description: string
  urlSite: string
  urlImg: string
}
