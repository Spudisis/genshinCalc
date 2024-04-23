export const getNumberDaysNow = (dateStart: string) => {
  const timeNow = Date.now()
  const newDate = new Date(timeNow)

  const different = newDate.getTime() - new Date(dateStart).getTime()

  const count = Math.round(different / (1000 * 3600 * 24))
  return count
}
