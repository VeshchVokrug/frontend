import { MONTHS } from '@/shared/constants/calendar'

type Props = {
  onPrevClick: () => void
  onNextClick: () => void
  currentMonth: number
}

export default function CalendarHeader({
  onPrevClick,
  onNextClick,
  currentMonth,
}: Props) {
  return (
    <div className="flex justify-between">
      <h3 className="text-[30px] font-medium">Выбор даты</h3>
      <div className="flex gap-5">
        <button onClick={onPrevClick} type="button">
          <svg
            width="13"
            height="23"
            viewBox="0 0 13 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21.5L1.5 11.5L11.5 1.5"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-[30px] font-medium uppercase">
          {MONTHS[currentMonth]}
        </p>
        <button onClick={onNextClick} type="button">
          <svg
            width="13"
            height="23"
            viewBox="0 0 13 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 21.5L11.5 11.5L1.5 1.5"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
