import { useMemo, useState } from 'react'

interface Day {
  date: Date | ''
  isActive: boolean
  isSelected: boolean
}

type Calendar = Day[][]

const UNAVAILABLE_DATES: Record<number, number[]> = {
  3: [1, 5, 7, 8, 9, 15, 16, 17, 19, 20],
  4: [1, 2, 3, 6, 7, 8],
}

const createCalendar = (
  unavailableDates: number[],
  currentFullDate: Date,
  firstSelectedDate: Date | '',
  lastSelectedDate: Date | ''
): Calendar => {
  const calendar: Calendar = Array.from({ length: 7 }, () => [])

  const currentYear = currentFullDate.getFullYear()
  const currentMonth = currentFullDate.getMonth()

  const firstMonthDay =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7
  const lastMonthDate = new Date(currentYear, currentMonth + 1, 0).getDate()

  for (let i = 0; i < firstMonthDay; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const isActive = !unavailableDates.includes(i)
    const isSelected =
      firstSelectedDate !== '' &&
      lastSelectedDate !== '' &&
      date >= firstSelectedDate &&
      date <= lastSelectedDate
    calendar[i % 7].push({ date: '', isActive, isSelected })
  }

  for (let i = 1; i <= lastMonthDate; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const isActive = !unavailableDates.includes(i)
    const isSelected =
      (firstSelectedDate !== '' &&
        lastSelectedDate !== '' &&
        date >= firstSelectedDate &&
        date <= lastSelectedDate) ||
      (firstSelectedDate instanceof Date &&
        lastSelectedDate === '' &&
        firstSelectedDate.getTime() === date.getTime())

    calendar[(firstMonthDay + i - 1) % 7].push({ date, isActive, isSelected })
  }

  return calendar
}

export const useCalendar = () => {
  const [currentFullDate, setCurrentFullDate] = useState<Date>(new Date())
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | ''>('')
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | ''>('')
  const [error, setError] = useState<string>('')

  const currentMonth = currentFullDate.getMonth()

  const calendar = useMemo(() => {
    const unavailableDates = UNAVAILABLE_DATES[currentMonth] ?? []
    return createCalendar(
      unavailableDates,
      currentFullDate,
      firstSelectedDate,
      lastSelectedDate
    )
  }, [currentFullDate, currentMonth, firstSelectedDate, lastSelectedDate])

  const setPrevMonth = () =>
    setCurrentFullDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    )

  const setNextMonth = () =>
    setCurrentFullDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    )

  const selectDate = (weekDay: number, week: number) => {
    const clickedDay = calendar[weekDay][week]

    if (!clickedDay.isActive) return

    const clickedDate = clickedDay.date as Date

    const firstDate = !firstSelectedDate
      ? clickedDate
      : firstSelectedDate && lastSelectedDate
        ? ''
        : firstSelectedDate
    const lastDate = firstSelectedDate && !lastSelectedDate ? clickedDate : ''

    if (
      firstDate instanceof Date &&
      lastDate instanceof Date &&
      firstDate.getTime() > lastDate.getTime()
    ) {
      setFirstSelectedDate(lastDate)
      setLastSelectedDate('')
      return
    }

    setFirstSelectedDate(firstDate)
    setLastSelectedDate(lastDate)
    setError('')

    if (firstDate !== '' && lastDate !== '') {
      const unavailableDates = UNAVAILABLE_DATES[currentMonth] ?? []
      const hasUnavailable = unavailableDates.some((day) => {
        const date = new Date(currentFullDate.getFullYear(), currentMonth, day)
        return date >= firstDate && date <= lastDate
      })
      if (hasUnavailable) setError('Выбраны недоступные даты')
    }
  }

  return {
    calendar,
    currentMonth,
    setPrevMonth,
    setNextMonth,
    selectDate,
    firstSelectedDate,
    lastSelectedDate,
    error,
  }
}
