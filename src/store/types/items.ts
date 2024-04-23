export type storeItem = {
  id: number
  name: string
  dateStart: string
  dateEnd: string | undefined
  countPrimogems: number
  countStart: number
  countAdd: number
  synchValue: number
  image: string
}

export type checkPerson = {
  uid: string
  dispatch: any
}

export type primogems = {
  id: number
  date: string
  dateTime: string | undefined
  countPrimogems: number
  countWishes: number
  countStarglitter: number
  differenceCountPrimogems: number
  differenceCountWishes: number
  differenceCountStarglitter: number
}

export type Synchronization = {
  id: number

  name: string
  value: number
  typeValue: string
}
export enum typeVal {
  'percent',
  'number'
}
