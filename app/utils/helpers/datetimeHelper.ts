import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const parseDate = (unixTimestamp: number): string =>
  dayjs.unix(unixTimestamp).format('DD.MM.YYYY HH:mm:ss')
