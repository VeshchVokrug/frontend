import { describe, it, expect } from 'vitest'
import { getPageRange } from './pagination.utils'

describe('getPageRange', () => {
  describe('все страницы помещаются (total <= maxVisiblePages)', () => {
    it('возвращает полный список страниц', () => {
      expect(getPageRange(1, 5)).toEqual([1, 2, 3, 4, 5])
    })

    it('возвращает полный список когда total равен maxVisiblePages', () => {
      expect(getPageRange(4, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    })
  })

  describe('текущая страница у начала (многоточие только справа)', () => {
    it('current = 1', () => {
      expect(getPageRange(1, 12)).toEqual([1, 2, 3, '...', 9, 10, 11, 12])
    })

    it('current = 2', () => {
      expect(getPageRange(2, 12)).toEqual([1, 2, 3, 4, '...', 10, 11, 12])
    })

    it('current = 3', () => {
      expect(getPageRange(3, 12)).toEqual([1, 2, 3, 4, 5, '...', 11, 12])
    })
  })

  describe('текущая страница у конца (многоточие только слева)', () => {
    it('current = last', () => {
      expect(getPageRange(12, 12)).toEqual([1, 2, 3, 4, '...', 10, 11, 12])
    })

    it('current = last - 1', () => {
      expect(getPageRange(11, 12)).toEqual([1, 2, 3, '...', 9, 10, 11, 12])
    })

    it('current = last - 2', () => {
      expect(getPageRange(10, 12)).toEqual([1, 2, '...', 8, 9, 10, 11, 12])
    })
  })

  describe('текущая страница в середине (многоточие с обеих сторон)', () => {
    it('current = 6, total = 12', () => {
      expect(getPageRange(6, 12)).toEqual([1, '...', 5, 6, 7, 8, '...', 12])
    })

    it('current = 7, total = 15', () => {
      expect(getPageRange(7, 15)).toEqual([1, '...', 6, 7, 8, 9, '...', 15])
    })
  })

  describe('результат всегда имеет правильную длину', () => {
    it('возвращает maxVisiblePages элементов когда total > maxVisiblePages', () => {
      expect(getPageRange(1, 20)).toHaveLength(8)
      expect(getPageRange(10, 20)).toHaveLength(8)
      expect(getPageRange(20, 20)).toHaveLength(8)
    })

    it('кастомный maxVisiblePages', () => {
      expect(getPageRange(5, 20, 2, 6)).toHaveLength(6)
    })
  })
})
