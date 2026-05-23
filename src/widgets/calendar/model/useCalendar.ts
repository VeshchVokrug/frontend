import { useEffect, useMemo, useRef, useState } from 'react'
import { createCalendar } from './createCalendar'
import { getDatesInRange, isSameDay } from '@/shared/lib/date'

export const useCalendar = (
  initUnavailableDates: Record<number, number[]> = {},
  singleRange: boolean = false
) => {
  const [currentFullDate, setCurrentFullDate] = useState<Date>(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [previewStart, setPreviewStart] = useState<Date | null>(null)
  const [previewEnd, setPreviewEnd] = useState<Date | null>(null)
  const [previewMode, setPreviewMode] = useState<'select' | 'deselect'>(
    'select'
  )
  const [error, setError] = useState<string>('')

  const isDragging = useRef(false)
  const dragStart = useRef<Date | null>(null)
  const dragMode = useRef<'select' | 'deselect'>('select')
  const previewEndRef = useRef<Date | null>(null)
  const applyCurrentRangeRef = useRef<() => void>(() => {})
  const activePointerIdRef = useRef<number | null>(null)
  const lastMoveDate = useRef<Date | null>(null)
  const singleRangeStartRef = useRef<Date | null>(null)

  const currentMonth = currentFullDate.getMonth()

  const calendar = useMemo(() => {
    const unavailableDates = initUnavailableDates[currentMonth] ?? []
    return createCalendar(
      unavailableDates,
      currentFullDate,
      selectedDates,
      previewStart,
      previewEnd
    )
  }, [
    currentFullDate,
    selectedDates,
    previewStart,
    previewEnd,
    initUnavailableDates,
    currentMonth,
  ])

  const setPrevMonth = () =>
    setCurrentFullDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    )

  const setNextMonth = () =>
    setCurrentFullDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    )

  const isDateUnavailable = (date: Date): boolean => {
    const unavailableDates = initUnavailableDates[currentMonth] ?? []
    return unavailableDates.some((day) =>
      isSameDay(
        new Date(currentFullDate.getFullYear(), currentMonth, day),
        date
      )
    )
  }

  const updatePreviewEnd = (date: Date | null) => {
    previewEndRef.current = date
    setPreviewEnd(date)
  }

  const applyCurrentRange = () => {
    if (!isDragging.current || !dragStart.current) return
    isDragging.current = false
    activePointerIdRef.current = null

    const start = dragStart.current
    const end = lastMoveDate.current ?? previewEndRef.current
    lastMoveDate.current = null

    if (!end) return

    dragStart.current = null
    updatePreviewEnd(null)
    setPreviewStart(null)
    setPreviewMode('select')
    setError('')

    const range = getDatesInRange(start, end)
    const hasUnavailable = range.some((d) => isDateUnavailable(d))
    if (hasUnavailable) return

    if (singleRange) {
      setSelectedDates(range)
    } else if (dragMode.current === 'deselect') {
      setSelectedDates((prev) =>
        prev.filter((d) => !range.some((r) => isSameDay(r, d)))
      )
    } else {
      setSelectedDates((prev) => {
        const newDates = range.filter((d) => !prev.some((s) => isSameDay(s, d)))
        return [...prev, ...newDates]
      })
    }
  }

  useEffect(() => {
    applyCurrentRangeRef.current = applyCurrentRange
  })

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (!isDragging.current) return
      applyCurrentRangeRef.current()
    }

    const handleGlobalPointerCancel = () => {
      if (!isDragging.current) return
      isDragging.current = false
      activePointerIdRef.current = null
      dragStart.current = null
      lastMoveDate.current = null
      updatePreviewEnd(null)
      setPreviewStart(null)
      setPreviewMode('select')
      setError('')
    }

    document.addEventListener('pointerup', handleGlobalPointerUp)
    document.addEventListener('pointercancel', handleGlobalPointerCancel)

    return () => {
      document.removeEventListener('pointerup', handleGlobalPointerUp)
      document.removeEventListener('pointercancel', handleGlobalPointerCancel)
    }
  }, [])

  const handlePointerDown = (date: Date, e: React.PointerEvent) => {
    if (isDateUnavailable(date)) return

    if (singleRange) {
      if (selectedDates.length > 0) {
        setSelectedDates([])
        singleRangeStartRef.current = date
        setPreviewStart(date)
        updatePreviewEnd(date)
        setError('')
        return
      }
      if (!singleRangeStartRef.current) {
        singleRangeStartRef.current = date
        setPreviewStart(date)
        updatePreviewEnd(date)
        setError('')
        return
      }

      let start = singleRangeStartRef.current
      let end = date

      if (end < start) {
        const temp = start
        start = end
        end = temp
      }

      const range = getDatesInRange(start, end)
      const hasUnavailable = range.some((d) => isDateUnavailable(d))

      if (hasUnavailable) {
        setError('Выбраны недоступные даты')
        singleRangeStartRef.current = null
        setPreviewStart(null)
        updatePreviewEnd(null)
        return
      }

      setSelectedDates(range)
      setPreviewStart(null)
      updatePreviewEnd(null)
      singleRangeStartRef.current = null
      setError('')
      return
    }

    e.currentTarget.setPointerCapture(e.pointerId)
    activePointerIdRef.current = e.pointerId

    isDragging.current = true
    dragStart.current = date
    lastMoveDate.current = null
    const mode = selectedDates.some((d) => isSameDay(d, date))
      ? 'deselect'
      : 'select'
    dragMode.current = mode
    setPreviewMode(mode)
    setPreviewStart(date)
    updatePreviewEnd(date)
  }

  const handlePointerEnter = (date: Date, e: React.PointerEvent) => {
    if (singleRange) return
    if (!isDragging.current || !dragStart.current) return
    if (
      activePointerIdRef.current !== null &&
      e.pointerId !== activePointerIdRef.current
    )
      return

    updatePreviewEnd(date)
    const range = getDatesInRange(dragStart.current, date)
    const hasUnavailable = range.some((d) => isDateUnavailable(d))
    setError(hasUnavailable ? 'Выбраны недоступные даты' : '')
  }

  const handlePointerMove = (date: Date, e: React.PointerEvent) => {
    if (singleRange) return
    if (!isDragging.current || !dragStart.current) return
    if (
      activePointerIdRef.current !== null &&
      e.pointerId !== activePointerIdRef.current
    )
      return

    const target = e.currentTarget as HTMLElement
    target.releasePointerCapture(e.pointerId)
    const el = document.elementFromPoint(e.clientX, e.clientY)
    target.setPointerCapture(e.pointerId)

    const dateEl = el?.closest<HTMLElement>('[data-date]')
    if (!dateEl?.dataset.date) return

    const hoveredDate = new Date(dateEl.dataset.date)
    if (isNaN(hoveredDate.getTime())) return

    lastMoveDate.current = hoveredDate

    updatePreviewEnd(hoveredDate)
    const range = getDatesInRange(dragStart.current, hoveredDate)
    const hasUnavailable = range.some((d) => isDateUnavailable(d))
    setError(hasUnavailable ? 'Выбраны недоступные даты' : '')
  }

  const handlePointerUp = (date: Date, e: React.PointerEvent) => {
    if (singleRange) return
    if (!isDragging.current || !dragStart.current) return
    if (
      activePointerIdRef.current !== null &&
      e.pointerId !== activePointerIdRef.current
    )
      return

    updatePreviewEnd(date)
    applyCurrentRange()
  }

  const getSelectedDates = (): string[] =>
    selectedDates.map((d) => d.toISOString())
  const resetSelectedDates = () => setSelectedDates([])

  return {
    calendar,
    currentMonth,
    setPrevMonth,
    setNextMonth,
    handlePointerDown,
    handlePointerEnter,
    handlePointerMove,
    handlePointerUp,
    previewMode,
    getSelectedDates,
    error,
    resetSelectedDates,
  }
}
