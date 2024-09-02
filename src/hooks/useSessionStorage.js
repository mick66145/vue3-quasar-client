export default function useSessionStorage () {
  // 設置sessionStorage
  const setSessionStorage = (key, val) => {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  }
  // 獲取sessionStorage
  const getSessionStorage = (key) => {
    const json = window.sessionStorage.getItem(key)
    return JSON.parse(json)
  }
  // 移除sessionStorage
  const removeSessionStorage = (key) => {
    window.sessionStorage.removeItem(key)
  }
  // 移除全部sessionStorage
  const clearSessionStorage = () => {
    window.sessionStorage.clear()
  }

  return {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    clearSessionStorage,
  }
}
