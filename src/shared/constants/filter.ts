export type DateOption = {
  value: string
  label: string
}

export const DATE_OPTIONS: DateOption[] = [
  { value: 'any', label: 'Неважно' },
  { value: 'today', label: 'Сегодня' },
  { value: 'tomorrow', label: 'Завтра' },
  { value: 'onThisWeek', label: 'На этой неделе' },
]
