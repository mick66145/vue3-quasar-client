export default function useLocalStorage () {
  // 設置localStorage
  const setLocalStorage = (key, val) => {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  // 獲取localStorage
  const getLocalStorage = (key) => {
    const json = window.localStorage.getItem(key)
    return JSON.parse(json)
  }
  // 移除localStorage
  const removeLocalStorage = (key) => {
    window.localStorage.removeItem(key)
  }
  // 移除全部localStorage
  const clearLocalStorage = () => {
    window.localStorage.clear()
  }

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage,
  }
}
