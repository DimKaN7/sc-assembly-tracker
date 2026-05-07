import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const parseDate = (unixTimestamp: number): string =>
  dayjs(unixTimestamp).format('DD.MM.YYYY HH:mm:ss')
