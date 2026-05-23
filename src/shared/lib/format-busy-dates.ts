export interface BusyDate {
  year: number
  month: number
  day: number
}

export const formatBusyDates = (dates: string[] | Date[]): BusyDate[] => {
  return dates.map((date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
    }
  })
}
