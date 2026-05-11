import { WEEKDAYS } from '@/shared/constants/calendar'
import { Calendar } from '../../model/createCalendar'
import { SelectHandlers } from '../../model/types'
import DateButton from './DateButton'

type Props = {
  calendar: Calendar
  onSelect: SelectHandlers
  previewMode: 'select' | 'deselect'
}

export default function CalendarGrid({
  calendar,
  onSelect,
  previewMode,
}: Props) {
  return (
    <ul className="mt-6 flex gap-10">
      {WEEKDAYS.map((weekday, index) => (
        <li key={index}>
          <h5
            className={`mb-3.75 text-[30px] font-bold ${(weekday === 'сб' || weekday === 'вс') && 'text-red'}`}
          >
            {weekday}
          </h5>
          <ul className="flex flex-col gap-3.75">
            {calendar[index].map(
              (
                {
                  date,
                  isActive,
                  isSelected,
                  isPreview,
                  isUnavailableInPreview,
                },
                indexDate
              ) => (
                <li key={`${index}-${indexDate}`} className="text-center">
                  <DateButton
                    date={date}
                    isActive={isActive}
                    isSelected={isSelected}
                    isPreview={isPreview}
                    isUnavailableInPreview={isUnavailableInPreview}
                    previewMode={previewMode}
                    onSelect={onSelect}
                  />
                </li>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  )
}
