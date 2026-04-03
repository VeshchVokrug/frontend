export const getPageRange = (
  current: number,
  total: number,
  delta: number = 2,
  maxVisiblePages: number = 8
) => {
  // Если вссе страницы помещаются — возвращаем полный список без многоточий
  if (total <= maxVisiblePages) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const result: (number | '...')[] = Array.from({ length: maxVisiblePages })
  const windowStart: number = Math.max(1, current - delta)
  const windowEnd: number = Math.min(total, current + delta)

  // Если текущая страница близко к началу — многоточие только в правой части
  if (windowStart <= delta) {
    const endIndex: number = windowEnd - 1

    for (let i = 0; i <= endIndex; i++) {
      result[i] = i + 1
    }

    for (let i = maxVisiblePages - 1; i > endIndex; i--) {
      if (i - 1 === endIndex) {
        result[i] = '...'
        break
      }
      result[i] = total - (maxVisiblePages - i - 1)
    }

    return result
  }

  // Если текущая страница близко к концу — многоточие только в левой части
  if (total - windowEnd <= delta) {
    const endIndex: number = maxVisiblePages - (total - windowStart) - 1

    for (let i = maxVisiblePages - 1; i >= endIndex; i--) {
      result[i] = total - (maxVisiblePages - i - 1)
    }

    for (let i = 0; i < endIndex; i++) {
      if (i + 1 === endIndex) {
        result[i] = '...'
        break
      }
      result[i] = i + 1
    }
    return result
  }

  // Если текущая страница в середине — многоточие с обеих сторон
  const center =
    maxVisiblePages % 2 === 0
      ? Math.floor(maxVisiblePages / 2) - 1
      : Math.floor(maxVisiblePages / 2)
  const start =
    maxVisiblePages % 2 === 0 ? center - (delta - 1) : center - delta
  const end = center + delta

  for (let i = start; i <= end; i++) {
    result[i] = windowStart + (i - start) + 1
  }

  for (let i = 0; i < start; i++) {
    if (i + 1 === start) {
      result[i] = '...'
      break
    }

    result[i] = i + 1
  }

  for (let i = maxVisiblePages - 1; i > end; i--) {
    if (i - 1 === end) {
      result[i] = '...'
      break
    }

    result[i] = total - (maxVisiblePages - i - 1)
  }

  return result
}
