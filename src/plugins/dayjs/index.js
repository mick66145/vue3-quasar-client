import dayjs from 'dayjs'

import isToday from 'dayjs/plugin/isToday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'

import 'dayjs/locale/zh-tw'

dayjs.extend(isToday)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)

export const $dayjs = dayjs

export const formatDate = (value, format) => {
  if (!value) return ''
  return $dayjs(value).format(format || 'YYYY-MM-DD HH:mm:ss')
}

export default function (app) {
  app.config.globalProperties.$filters = {
    formatDate,
  }
  app.provide('formatDate', formatDate)
  app.provide('$dayjs', $dayjs)
}
