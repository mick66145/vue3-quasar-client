// https://juejin.cn/post/6844904113986076686

/** 單條件精準查找
* @param {Array} lists 所有數據
* @param {string} key 需要查詢的數據的鍵值
* @param {string} value 需要查詢的值
*/
export const searchKeyValue = (lists, key, value) => {
  const res = lists.filter(item => item[key] === value)
  return res
}

/** 單條件多值精準查找
* @param {Array} lists 所有數據
* @param {string} key 需要查詢的數據的鍵值
* @param {Array} valueArr 需要查詢的值
*/
export const searchKeyValues = (lists, key, valueArr) => {
  const res = lists.filter(item => valueArr.find(i => i === item[key]))
  return res
}

/** 多條件精準查找
* @param {Array} lists 所有數據
* @param {Object} filters 需要查詢的數據
*/
export const searchKeysValue = (lists, filters) => {
  const key = Object.keys(filters)
  const resArr = lists.filter(item => key.find(k => item[k] === filters[k]))
  return resArr
}

/** 多條件多值精準查找
 * @param {Array} lists 所有數據
 * @param {Object} filters 需要查詢的數據
 */
export const searchKeysValues = (lists, filters) => {
  const resArr = []
  lists.filter((item) => {
    for (const i in filters) {
      for (const j of filters[i]) {
        if (item[i] === j) {
          resArr.push(item)
        }
      }
    }
    return resArr
  })
  return lists
}

/** 模糊查詢
 * @param {Array} lists 所有數據
 * @param {string} keyWord 需要查詢的關鍵字
 */
export const selectMatchItem = (lists, keyWord) => {
  const resArr = []
  lists.filter(item => {
    if (Object.prototype.toString.call(item) === '[object String]') {
      if (item.toLowerCase().includes(keyWord.toLowerCase())) {
        resArr.push(item)
      }
    } else {
      for (const i in item) {
        if (Object.prototype.toString.call(item[i]) === '[object String]') {
          if (item[i].toLowerCase().includes(keyWord.toLowerCase())) {
            resArr.push(item)
            break
          }
        }
      }
    }
    return lists
  })
  return resArr
}

/** 多值模糊查詢
* @param {Array} lists 所有數據
* @param {Array} keyWords 需要查詢的關鍵字
*/
export const selectMatchItems = (lists, keyWords) => {
  const resArr = []
  lists.filter(item => keyWords.find(keyWord => {
    if (Object.prototype.toString.call(item) === '[object String]') {
      if (item.toLowerCase().includes(keyWord.toLowerCase())) {
        resArr.push(item)
      }
    } else {
      for (const i in item) {
        if (item[i].toLowerCase().includes(keyWord.toLowerCase())) {
          resArr.push(item)
          break
        }
      }
    }
    return lists
  }))
  return resArr
}
