/**
 * @param {mix} type 隨機字串格式，格式類型：up_en 大寫字母、low_en 小寫字母、num 數字、sp_str 特殊字串</p><br><p>ex：<br>選擇單一類型，輸入使用字串 upEn<br>選擇多類型，輸入使用陣列 [upEn, lowEn, num]
 * @param {int} length 幾位數加一個符號
 * @returns {string} 輸出對應長度的隨機字串
 */
export function randomHashKey (type, length) {
  const strShuffle = (input) => {
    var a = input.split('')
    var n = a.length

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = a[i]
      a[i] = a[j]
      a[j] = tmp
    }
    return a.join('')
  }
  const upEn = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const lowEn = 'qwertyuiopasdfghjklzxcvbnm'
  const num = '1234567890'
  const spStr = '@#$%~_-+'
  let randomStr = ''
  let result = ''

  if (!Array.isArray(type)) {
    type = [type]
  }

  type.forEach(
    element => {
      switch (element) {
      case 'up_en':
        randomStr += upEn
        break
      case 'low_en':
        randomStr += lowEn
        break
      case 'num':
        randomStr += num
        break
      case 'sp_str':
        randomStr += spStr
        break
      default:
        break
      }
    },
  )

  for (let i = 0; i < length; i++) {
    result += strShuffle(randomStr).substr(5, 1)
  }
  return result
}

/**
 *
 * @param {string} input 輸入
 * @param {string} symbol 符號
 * @param {int} index 幾位數加一個符號
 * @returns {string} 加上符號的字串
 */
export function formatNumber (input, symbol, index) {
  const source = String(input).split('.') // 按小數點分成2部分
  source[0] = source[0].replace(new RegExp(`(\\d)(?=(\\d{${index}})+$)`, 'ig'), '$1,')// 只將整數部分進行都好分割
  return source.join(symbol)
}

export const getValueByPath = function (object, prop) {
  if (typeof object !== 'object') return object
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}
