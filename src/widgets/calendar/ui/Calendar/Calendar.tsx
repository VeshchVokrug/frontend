'use client'

import { useCalendar } from '../../model/useCalendar'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import CalendarFooter from './CalendarFooter'

type Props = {
  buttonText?: string
  mode?: 'rent' | 'create'
  unavailableDates?: Record<number, number[]>
  onSelect?: (dates: string[]) => void
}

export default function Calendar({
  buttonText = 'Выбрать',
  mode = 'rent',
  unavailableDates,
  onSelect,
}: Props) {
  const {
    calendar,
    currentMonth,
    setPrevMonth,
    setNextMonth,
    handlePointerDown,
    handlePointerEnter,
    handlePointerUp,
    handlePointerMove,
    previewMode,
    getSelectedDates,
    error,
    resetSelectedDates,
  } = useCalendar(unavailableDates)

  const handleConfirm = () => onSelect?.(getSelectedDates())

  return (
    <section className="bg-gray w-fit rounded-[30px] px-12.5 py-7.5">
      <CalendarHeader
        onPrevClick={setPrevMonth}
        onNextClick={setNextMonth}
        currentMonth={currentMonth}
      />

      <CalendarGrid
        calendar={calendar}
        onSelect={{
          pointerDown: handlePointerDown,
          pointerEnter: handlePointerEnter,
          pointerUp: handlePointerUp,
          pointerMove: handlePointerMove,
        }}
        previewMode={previewMode}
      />

      <CalendarFooter
        onReset={resetSelectedDates}
        mode={mode}
        buttonText={buttonText}
        error={error}
        disabled={error.length > 0 || getSelectedDates().length === 0}
        onConfirm={handleConfirm}
      />
    </section>
  )
}
