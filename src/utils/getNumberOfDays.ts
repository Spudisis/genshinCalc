import { betweenDate } from '../store/types/calc'

export const getNumberOfDays = ({ dateStart, dateEnd }: betweenDate) => {
  const dateNow = Date.now()
  const newDate = new Date(dateEnd || dateNow)
  const oldDate = new Date(dateStart)

  const different = newDate.getTime() - oldDate.getTime()

  let count = Math.round(different / (1000 * 3600 * 24))
  return count
}
