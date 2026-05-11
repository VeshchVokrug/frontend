import { isSameDay, isBetween } from '@/shared/lib/date'

interface Day {
  date: Date | ''
  isActive: boolean
  isSelected: boolean
  isPreview: boolean
  isUnavailableInPreview: boolean
}

export type Calendar = Day[][]

export const createCalendar = (
  unavailableDates: number[],
  currentFullDate: Date,
  selectedDates: Date[],
  previewStart: Date | null,
  previewEnd: Date | null
): Calendar => {
  const calendar: Calendar = Array.from({ length: 7 }, () => [])

  const currentYear = currentFullDate.getFullYear()
  const currentMonth = currentFullDate.getMonth()

  const firstMonthDay =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7
  const lastMonthDate = new Date(currentYear, currentMonth + 1, 0).getDate()

  for (let i = 0; i < firstMonthDay; i++) {
    calendar[i % 7].push({
      date: '',
      isActive: false,
      isSelected: false,
      isPreview: false,
      isUnavailableInPreview: false,
    })
  }

  for (let i = 1; i <= lastMonthDate; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const isActive = !unavailableDates.includes(i)
    const isSelected = selectedDates.some((d) => isSameDay(d, date))
    const isPreview =
      previewStart !== null &&
      previewEnd !== null &&
      isBetween(date, previewStart, previewEnd)
    const isUnavailableInPreview = isPreview && !isActive

    calendar[(firstMonthDay + i - 1) % 7].push({
      date,
      isActive,
      isSelected,
      isPreview,
      isUnavailableInPreview,
    })
  }

  return calendar
}
