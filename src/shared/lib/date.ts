export const isSameDay = (a: Date, b: Date) => a.getTime() === b.getTime()

export const isBetween = (date: Date, a: Date, b: Date) => {
  const min = a < b ? a : b
  const max = a < b ? b : a
  return date >= min && date <= max
}

export const getDatesInRange = (a: Date, b: Date): Date[] => {
  const min = a < b ? a : b
  const max = a < b ? b : a
  const dates: Date[] = []
  const current = new Date(min)
  while (current <= max) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
}
