const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export function formatDateRange(start: Date, end: Date): string {
  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = MONTHS_GENITIVE[start.getMonth()]
  const endMonth = MONTHS_GENITIVE[end.getMonth()]
  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  const sameMonth = start.getMonth() === end.getMonth() && startYear === endYear
  const sameYear = startYear === endYear

  if (sameMonth) return `${startDay} - ${endDay} ${endMonth}`
  if (sameYear) return `${startDay} ${startMonth} - ${endDay} ${endMonth}`
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
}
