import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCalendar } from './useCalendar'

const calendarState = vi.hoisted(() => ({
  currentFullDate: new Date(2026, 3, 1),
  firstSelectedDate: '' as Date | '',
  lastSelectedDate: '' as Date | '',
  error: '',
  callIndex: 0,
}))

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')

  return {
    ...actual,
    useMemo: ((factory: () => unknown) => factory()) as typeof actual.useMemo,
    useState: (() => {
      const idx = calendarState.callIndex % 4
      calendarState.callIndex++

      if (idx === 0) {
        const setValue = (value: Date | ((prev: Date) => Date)) => {
          calendarState.currentFullDate =
            typeof value === 'function'
              ? value(calendarState.currentFullDate)
              : value
        }
        return [calendarState.currentFullDate, setValue]
      }

      if (idx === 1) {
        const setValue = (
          value: Date | '' | ((prev: Date | '') => Date | '')
        ) => {
          calendarState.firstSelectedDate =
            typeof value === 'function'
              ? value(calendarState.firstSelectedDate)
              : value
        }
        return [calendarState.firstSelectedDate, setValue]
      }

      if (idx === 2) {
        const setValue = (
          value: Date | '' | ((prev: Date | '') => Date | '')
        ) => {
          calendarState.lastSelectedDate =
            typeof value === 'function'
              ? value(calendarState.lastSelectedDate)
              : value
        }
        return [calendarState.lastSelectedDate, setValue]
      }

      const setValue = (value: string | ((prev: string) => string)) => {
        calendarState.error =
          typeof value === 'function' ? value(calendarState.error) : value
      }
      return [calendarState.error, setValue]
    }) as typeof actual.useState,
  }
})

describe('useCalendar', () => {
  beforeEach(() => {
    calendarState.currentFullDate = new Date(2026, 3, 1)
    calendarState.firstSelectedDate = ''
    calendarState.lastSelectedDate = ''
    calendarState.error = ''
    calendarState.callIndex = 0
  })

  it('возвращает начальное состояние', () => {
    const result = useCalendar()

    expect(result.currentMonth).toBe(3)
    expect(result.firstSelectedDate).toBe('')
    expect(result.lastSelectedDate).toBe('')
    expect(result.error).toBe('')
    expect(result.calendar).toHaveLength(7)
  })

  it('setPrevMonth переходит на предыдущий месяц', () => {
    let result = useCalendar()
    result.setPrevMonth()
    result = useCalendar()

    expect(result.currentMonth).toBe(2)
  })

  it('setNextMonth переходит на следующий месяц', () => {
    let result = useCalendar()
    result.setNextMonth()
    result = useCalendar()

    expect(result.currentMonth).toBe(4)
  })

  it('setPrevMonth корректно переходит с января на декабрь', () => {
    calendarState.currentFullDate = new Date(2026, 0, 1)
    let result = useCalendar()
    result.setPrevMonth()
    result = useCalendar()

    expect(result.currentMonth).toBe(11)
  })

  it('setNextMonth корректно переходит с декабря на январь', () => {
    calendarState.currentFullDate = new Date(2026, 11, 1)
    let result = useCalendar()
    result.setNextMonth()
    result = useCalendar()

    expect(result.currentMonth).toBe(0)
  })

  it('selectDate устанавливает firstSelectedDate при первом клике', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()

    expect(result.firstSelectedDate).toEqual(new Date(2026, 3, 10))
    expect(result.lastSelectedDate).toBe('')
  })

  it('selectDate устанавливает lastSelectedDate при втором клике', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()

    expect(result.firstSelectedDate).toEqual(new Date(2026, 3, 10))
    expect(result.lastSelectedDate).toEqual(new Date(2026, 3, 12))
  })

  it('selectDate сбрасывает выбор при третьем клике', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()
    result.selectDate(5, 1)
    result = useCalendar()

    expect(result.firstSelectedDate).toBe('')
    expect(result.lastSelectedDate).toBe('')
  })

  it('selectDate не меняет состояние при клике на недоступную дату', () => {
    let result = useCalendar()
    result.selectDate(3, 1)
    result = useCalendar()

    expect(result.firstSelectedDate).toBe('')
    expect(result.lastSelectedDate).toBe('')
  })

  it('selectDate меняет порядок если первая дата позже второй', () => {
    let result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()

    expect(result.firstSelectedDate).toEqual(new Date(2026, 3, 10))
    expect(result.lastSelectedDate).toBe('')
  })

  it('selectDate устанавливает ошибку при диапазоне с недоступными датами', () => {
    let result = useCalendar()
    result.selectDate(5, 0)
    result = useCalendar()
    result.selectDate(0, 1)
    result = useCalendar()

    expect(result.error).toBe('Выбраны недоступные даты')
  })

  it('selectDate не устанавливает ошибку при корректном диапазоне', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()

    expect(result.error).toBe('')
  })

  it('selectDate сбрасывает ошибку при новом выборе', () => {
    let result = useCalendar()
    result.selectDate(5, 0)
    result = useCalendar()
    result.selectDate(0, 1)
    result = useCalendar()

    expect(result.error).toBe('Выбраны недоступные даты')

    result.selectDate(5, 1)
    result = useCalendar()

    expect(result.error).toBe('')
  })

  it('даты в выбранном диапазоне помечены isSelected', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()

    const april11 = result.calendar[5][1]
    expect(april11.isSelected).toBe(true)
  })

  it('даты вне диапазона не помечены isSelected', () => {
    let result = useCalendar()
    result.selectDate(4, 1)
    result = useCalendar()
    result.selectDate(6, 1)
    result = useCalendar()

    const april13 = result.calendar[0][2]
    expect(april13.isSelected).toBe(false)
  })

  it('без выбранных дат isSelected не устанавливается', () => {
    const result = useCalendar()

    const allSelected = result.calendar.flat().some((day) => day.isSelected)

    expect(allSelected).toBe(false)
  })
})
