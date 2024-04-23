import { objForm } from '../components/addPrimo/AddPrimogems'
import { primogems } from '../store/types/items'

const checkTwoDigit = (number: number) => {
  return number < 10 ? '0' + number : number
}

export const calcChangePrimogems = (
  obj: objForm,

  primogems: primogems[]
) => {
  const lastChange = primogems.length !== 0 && primogems[0]

  const date = getDateNow()
  const dateTime = getTimeNow()

  if (lastChange) {
    return {
      id: Math.random(),
      date: date,
      dateTime: dateTime,
      countPrimogems: obj.countPrimogems,
      countWishes: obj.countWishes,
      countStarglitter: obj.countStarglitter,
      differenceCountPrimogems: obj.countPrimogems - lastChange.countPrimogems,
      differenceCountWishes: obj.countWishes - lastChange.countWishes,
      differenceCountStarglitter: obj.countStarglitter - lastChange.countStarglitter
    }
  }
  return {
    id: Math.random(),
    date: date,
    dateTime: dateTime,
    countPrimogems: obj.countPrimogems,
    countWishes: obj.countWishes,
    countStarglitter: obj.countStarglitter,
    differenceCountPrimogems: 0,
    differenceCountWishes: 0,
    differenceCountStarglitter: 0
  }
}

export const getDateNow = () => {
  const now = Date.now()
  const dateNow = new Date(now)
  return dateNow.getFullYear() + '-' + checkTwoDigit(dateNow.getMonth() + 1) + '-' + checkTwoDigit(dateNow.getDay())
}

export const getTimeNow = () => {
  const now = Date.now()
  const timeNow = new Date(now)
  return checkTwoDigit(timeNow.getHours()) + ':' + checkTwoDigit(timeNow.getMinutes()) + ':' + checkTwoDigit(timeNow.getSeconds())
}
