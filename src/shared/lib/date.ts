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

export const resolveDate = (value: string): Date | null => {
  if (value === 'today') return new Date()
  if (value === 'tomorrow') {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
  }
  if (value === 'onThisWeek') {
    const d = new Date()
    d.setDate(d.getDate() + (7 - d.getDay()))
    return d
  }
  return null
}
