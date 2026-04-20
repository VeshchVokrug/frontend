'use client'

import { MONTHS, WEEKDAYS } from '@/shared/constants/calendar'
import { useCalendar } from '../../model/useCalendar'

export default function Calendar() {
  const {
    calendar,
    currentMonth,
    setPrevMonth,
    setNextMonth,
    selectDate,
    firstSelectedDate,
    lastSelectedDate,
    error,
  } = useCalendar()

  return (
    <section className="bg-gray w-fit rounded-[30px] px-12.5 py-7.5">
      <div className="flex justify-between">
        <h3 className="text-[30px] font-medium">Выбор даты</h3>
        <div className="flex gap-5">
          <button onClick={setPrevMonth}>
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
          <button onClick={setNextMonth}>
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
                ({ date, isActive, isSelected }, indexDate) => (
                  <li key={`${index}-${indexDate}`} className="text-center">
                    <button
                      className={`disabled:text-disabled relative isolate text-[30px] ${date === '' && 'opacity-0'} ${isSelected && 'text-main'}`}
                      disabled={!isActive && !isSelected}
                      onClick={() => selectDate(index, indexDate)}
                    >
                      {date === '' ? 0 : new Date(date).getDate()}
                    </button>
                  </li>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-disabled text-[20px]">Забронировано</p>
        <button
          className="disabled:bg-dark-gray bg-main rounded-4xl px-7.5 py-2.5 text-[18px] font-bold text-white transition hover:opacity-80 disabled:hover:opacity-100"
          disabled={error.length > 0 || !firstSelectedDate || !lastSelectedDate}
        >
          Выбрать
        </button>
      </div>
      {error && <p className="text-red text-2xl">{error}</p>}
    </section>
  )
}
