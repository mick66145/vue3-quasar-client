import { $dayjs } from '@/plugins/dayjs'

export const convertDateTime = (v, format = 'YYYY/MM/DD') => {
  return $dayjs(v).format(format)
}

export const convertDayOfWeek = (v) => {
  const day = $dayjs(v).day()
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return week[day]
}

export const convertMoney = (number, places, symbol, thousand, decimal) => {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : '$'
  thousand = thousand || ','
  decimal = decimal || '.'
  var negative = number < 0 ? '-' : ''
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  let j = ''
  j = (j = i.length) > 3 ? j % 3 : 0
  return negative + symbol + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

export function convertTrueFalseString (word) {
  if (typeof word === 'string') {
    switch (word.toLowerCase().trim()) {
    case 'yes': case 'true': case '1': return true
    case 'no': case 'false': case '0': case null : return false
    default: return Boolean(word)
    }
  } else if (typeof word === 'number') {
    switch (word) {
    case 1: return true
    case 0: return false
    }
  } else {
    return word
  }
}

export const convertTextAreaToHtml = (data) => {
  return data.replace(/\n/g, '<br/>').replace(/ /g, ' &nbsp')
}
