import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCalendar } from './useCalendar'

const UNAVAILABLE_DATES: Record<number, number[]> = {
  3: [5, 7, 8, 9, 15],
}

const state = vi.hoisted(() => ({
  currentFullDate: new Date(),
  selectedDates: [] as Date[],
  previewStart: null as Date | null,
  previewEnd: null as Date | null,
  previewMode: 'select' as 'select' | 'deselect',
  error: '',
  callIndex: 0,
  refIndex: 0,
  refs: {
    isDragging: { current: false },
    dragStart: { current: null as Date | null },
    dragMode: { current: 'select' as 'select' | 'deselect' },
    previewEndRef: { current: null as Date | null },
    applyCurrentRangeRef: { current: () => {} },
    activePointerId: { current: null as number | null },
    lastMoveDate: { current: null as Date | null },
  },
}))

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')

  return {
    ...actual,
    useMemo: ((factory: () => unknown) => factory()) as typeof actual.useMemo,
    useEffect: ((fn: () => void) => fn()) as typeof actual.useEffect,
    useRef: (() => {
      const idx = state.refIndex % 7
      state.refIndex++
      const refKeys = [
        'isDragging',
        'dragStart',
        'dragMode',
        'previewEndRef',
        'applyCurrentRangeRef',
        'activePointerId',
        'lastMoveDate',
      ] as const
      return state.refs[refKeys[idx]]
    }) as typeof actual.useRef,
    useState: (() => {
      const idx = state.callIndex % 6
      state.callIndex++

      const cases = [
        [
          () => state.currentFullDate,
          (v: Date | ((p: Date) => Date)) => {
            state.currentFullDate =
              typeof v === 'function' ? v(state.currentFullDate) : v
          },
        ],
        [
          () => state.selectedDates,
          (v: Date[] | ((p: Date[]) => Date[])) => {
            state.selectedDates =
              typeof v === 'function' ? v(state.selectedDates) : v
          },
        ],
        [
          () => state.previewStart,
          (v: Date | null) => {
            state.previewStart = v
          },
        ],
        [
          () => state.previewEnd,
          (v: Date | null) => {
            state.previewEnd = v
          },
        ],
        [
          () => state.previewMode,
          (v: 'select' | 'deselect') => {
            state.previewMode = v
          },
        ],
        [
          () => state.error,
          (v: string) => {
            state.error = v
          },
        ],
      ]

      const [get, set] = cases[idx] as [() => unknown, (v: unknown) => void]
      return [get(), set]
    }) as typeof actual.useState,
  }
})

const makePointerEvent = (pointerId = 1) =>
  ({
    pointerId,
    clientX: 0,
    clientY: 0,
    currentTarget: {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
    },
  }) as unknown as React.PointerEvent

describe('useCalendar', () => {
  beforeEach(() => {
    state.currentFullDate = new Date()
    state.selectedDates = []
    state.previewStart = null
    state.previewEnd = null
    state.previewMode = 'select'
    state.error = ''
    state.callIndex = 0
    state.refIndex = 0
    state.refs.isDragging.current = false
    state.refs.dragStart.current = null
    state.refs.dragMode.current = 'select'
    state.refs.previewEndRef.current = null
    state.refs.applyCurrentRangeRef.current = () => {}
    state.refs.activePointerId.current = null
    state.refs.lastMoveDate.current = null

    global.document = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      elementFromPoint: vi.fn(() => null),
    } as unknown as Document
  })

  const useResult = (unavailableDates = {}) => {
    state.callIndex = 0
    state.refIndex = 0
    return useCalendar(unavailableDates)
  }

  it('возвращает начальное состояние', () => {
    const result = useResult()

    expect(result.currentMonth).toBe(new Date().getMonth())
    expect(result.calendar).toHaveLength(7)
    expect(result.error).toBe('')
    expect(result.getSelectedDates()).toHaveLength(0)
  })

  it('setPrevMonth переходит на предыдущий месяц', () => {
    const prevMonth = (new Date().getMonth() + 11) % 12
    useResult().setPrevMonth()

    expect(useResult().currentMonth).toBe(prevMonth)
  })

  it('setNextMonth переходит на следующий месяц', () => {
    const nextMonth = (new Date().getMonth() + 1) % 12
    useResult().setNextMonth()

    expect(useResult().currentMonth).toBe(nextMonth)
  })

  it('handlePointerDown выбирает дату', () => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 10)
    const e = makePointerEvent()

    useResult().handlePointerDown(date, e)
    useResult().handlePointerUp(date, e)

    expect(useResult().getSelectedDates()).toContain(date.toISOString())
  })

  it('handlePointerDown не выбирает недоступную дату', () => {
    state.currentFullDate = new Date(2026, 3, 1)
    const date = new Date(2026, 3, 5)
    const e = makePointerEvent()

    useResult(UNAVAILABLE_DATES).handlePointerDown(date, e)
    useResult(UNAVAILABLE_DATES).handlePointerUp(date, e)

    expect(useResult(UNAVAILABLE_DATES).getSelectedDates()).toHaveLength(0)
  })

  it('handlePointerUp применяет диапазон', () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const start = new Date(year, month, 10)
    const end = new Date(year, month, 13)
    const e = makePointerEvent()

    useResult().handlePointerDown(start, e)
    useResult().handlePointerEnter(end, e)
    useResult().handlePointerUp(end, e)

    const selected = useResult().getSelectedDates()
    expect(selected).toHaveLength(4)
    expect(selected).toContain(start.toISOString())
    expect(selected).toContain(end.toISOString())
  })

  it('повторный handlePointerDown на выбранной дате переключает в режим deselect', () => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 10)
    const e = makePointerEvent()

    useResult().handlePointerDown(date, e)
    useResult().handlePointerUp(date, e)
    useResult().handlePointerDown(date, e)
    useResult().handlePointerUp(date, e)

    expect(useResult().getSelectedDates()).toHaveLength(0)
  })

  it('deselect убирает диапазон из выбранных', () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const start = new Date(year, month, 10)
    const end = new Date(year, month, 13)
    const e = makePointerEvent()

    useResult().handlePointerDown(start, e)
    useResult().handlePointerUp(end, e)
    useResult().handlePointerDown(start, e)
    useResult().handlePointerUp(end, e)

    expect(useResult().getSelectedDates()).toHaveLength(0)
  })

  it('handlePointerEnter обновляет превью', () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const start = new Date(year, month, 10)
    const mid = new Date(year, month, 12)
    const e = makePointerEvent()

    useResult().handlePointerDown(start, e)
    useResult().handlePointerEnter(mid, e)

    const allDays = useResult().calendar.flat()
    const preview = allDays.filter((d) => d.isPreview && d.date !== '')
    expect(preview).toHaveLength(3)
  })

  it('handlePointerEnter устанавливает ошибку если в диапазоне недоступные даты', () => {
    state.currentFullDate = new Date(2026, 3, 1)
    const e = makePointerEvent()

    useResult(UNAVAILABLE_DATES).handlePointerDown(new Date(2026, 3, 3), e)
    useResult(UNAVAILABLE_DATES).handlePointerEnter(new Date(2026, 3, 10), e)

    expect(useResult(UNAVAILABLE_DATES).error).toBe('Выбраны недоступные даты')
  })

  it('handlePointerUp сбрасывает ошибку и не применяет диапазон с недоступными датами', () => {
    state.currentFullDate = new Date(2026, 3, 1)
    const e = makePointerEvent()

    useResult(UNAVAILABLE_DATES).handlePointerDown(new Date(2026, 3, 3), e)
    useResult(UNAVAILABLE_DATES).handlePointerUp(new Date(2026, 3, 10), e)

    expect(useResult(UNAVAILABLE_DATES).error).toBe('')
    expect(useResult(UNAVAILABLE_DATES).getSelectedDates()).toHaveLength(0)
  })

  it('getSelectedDates возвращает ISO строки', () => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 10)
    const e = makePointerEvent()

    useResult().handlePointerDown(date, e)
    useResult().handlePointerUp(date, e)

    expect(useResult().getSelectedDates()[0]).toBe(date.toISOString())
  })
})
