export const getNoun = (num: number, one: string, two: string, five: string): string => {
  num %= 100
  if (num >= 5 && num <= 20) return five
  num %= 10
  if (num == 1) return one
  if (num >= 2 && num <= 4) return two
  return five
}

export const getAssemblyTypeStr = (type: AssemblyType): string => {
  switch (type) {
    case 'all':
      return 'Все'
    case 'private':
      return 'Приватные'
    default:
      return 'Публичные'
  }
}
