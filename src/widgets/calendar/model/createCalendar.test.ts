import { describe, expect, it } from 'vitest'
import { createCalendar } from './createCalendar'

const BASE_DATE = new Date(2026, 3, 1)

describe('createCalendar', () => {
  it('возвращает 7 колонок', () => {
    const result = createCalendar([], BASE_DATE, [], null, null)
    expect(result).toHaveLength(7)
  })

  it('все дни апреля присутствуют', () => {
    const result = createCalendar([], BASE_DATE, [], null, null)
    const allDates = result
      .flat()
      .filter((d) => d.date !== '')
      .map((d) => (d.date as Date).getDate())

    expect(allDates).toHaveLength(30)
    expect(allDates).toContain(1)
    expect(allDates).toContain(30)
  })

  it('пустые ячейки имеют date равный пустой строке', () => {
    const result = createCalendar([], BASE_DATE, [], null, null)
    const empty = result.flat().filter((d) => d.date === '')
    empty.forEach((d) => {
      expect(d.isActive).toBe(false)
      expect(d.isSelected).toBe(false)
      expect(d.isPreview).toBe(false)
      expect(d.isUnavailableInPreview).toBe(false)
    })
  })

  it('недоступные даты помечены isActive false', () => {
    const result = createCalendar([5, 10, 15], BASE_DATE, [], null, null)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april5 = allDays.find((d) => (d.date as Date).getDate() === 5)
    const april10 = allDays.find((d) => (d.date as Date).getDate() === 10)
    const april15 = allDays.find((d) => (d.date as Date).getDate() === 15)

    expect(april5?.isActive).toBe(false)
    expect(april10?.isActive).toBe(false)
    expect(april15?.isActive).toBe(false)
  })

  it('доступные даты помечены isActive true', () => {
    const result = createCalendar([5], BASE_DATE, [], null, null)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april6 = allDays.find((d) => (d.date as Date).getDate() === 6)
    expect(april6?.isActive).toBe(true)
  })

  it('выбранные даты помечены isSelected true', () => {
    const selected = [new Date(2026, 3, 10), new Date(2026, 3, 15)]
    const result = createCalendar([], BASE_DATE, selected, null, null)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april10 = allDays.find((d) => (d.date as Date).getDate() === 10)
    const april15 = allDays.find((d) => (d.date as Date).getDate() === 15)
    const april11 = allDays.find((d) => (d.date as Date).getDate() === 11)

    expect(april10?.isSelected).toBe(true)
    expect(april15?.isSelected).toBe(true)
    expect(april11?.isSelected).toBe(false)
  })

  it('даты в диапазоне превью помечены isPreview true', () => {
    const previewStart = new Date(2026, 3, 5)
    const previewEnd = new Date(2026, 3, 10)
    const result = createCalendar([], BASE_DATE, [], previewStart, previewEnd)
    const allDays = result.flat().filter((d) => d.date !== '')

    for (let i = 5; i <= 10; i++) {
      const day = allDays.find((d) => (d.date as Date).getDate() === i)
      expect(day?.isPreview).toBe(true)
    }
  })

  it('даты вне диапазона превью не помечены isPreview', () => {
    const previewStart = new Date(2026, 3, 5)
    const previewEnd = new Date(2026, 3, 10)
    const result = createCalendar([], BASE_DATE, [], previewStart, previewEnd)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april4 = allDays.find((d) => (d.date as Date).getDate() === 4)
    const april11 = allDays.find((d) => (d.date as Date).getDate() === 11)

    expect(april4?.isPreview).toBe(false)
    expect(april11?.isPreview).toBe(false)
  })

  it('недоступная дата в превью помечена isUnavailableInPreview true', () => {
    const previewStart = new Date(2026, 3, 5)
    const previewEnd = new Date(2026, 3, 10)
    const result = createCalendar([7], BASE_DATE, [], previewStart, previewEnd)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april7 = allDays.find((d) => (d.date as Date).getDate() === 7)
    expect(april7?.isUnavailableInPreview).toBe(true)
  })

  it('доступная дата в превью не помечена isUnavailableInPreview', () => {
    const previewStart = new Date(2026, 3, 5)
    const previewEnd = new Date(2026, 3, 10)
    const result = createCalendar([7], BASE_DATE, [], previewStart, previewEnd)
    const allDays = result.flat().filter((d) => d.date !== '')

    const april6 = allDays.find((d) => (d.date as Date).getDate() === 6)
    expect(april6?.isUnavailableInPreview).toBe(false)
  })

  it('prevEnd раньше previewStart — превью всё равно работает', () => {
    const previewStart = new Date(2026, 3, 10)
    const previewEnd = new Date(2026, 3, 5)
    const result = createCalendar([], BASE_DATE, [], previewStart, previewEnd)
    const allDays = result.flat().filter((d) => d.date !== '')

    for (let i = 5; i <= 10; i++) {
      const day = allDays.find((d) => (d.date as Date).getDate() === i)
      expect(day?.isPreview).toBe(true)
    }
  })

  it('без prevStart и previewEnd isPreview не устанавливается', () => {
    const result = createCalendar([], BASE_DATE, [], null, null)
    const hasPreview = result.flat().some((d) => d.isPreview)
    expect(hasPreview).toBe(false)
  })

  it('первый день месяца на правильной позиции — апрель 2026 начинается в среду', () => {
    const result = createCalendar([], BASE_DATE, [], null, null)
    const firstDay = result[2].find(
      (d) => d.date !== '' && (d.date as Date).getDate() === 1
    )
    expect(firstDay).toBeDefined()
  })
})
