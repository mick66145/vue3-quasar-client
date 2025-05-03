
export default function useStorage (type = 'session') {
  const createSessionStorage = () => ({
    setItem: (key, value) => window.sessionStorage.setItem(key, JSON.stringify(value)),
    getItem: (key, defaultValue = null) => {
      try {
        const json = window.sessionStorage.getItem(key)
        return json ? JSON.parse(json) : defaultValue
      } catch (error) {
        console.error(`sessionStorage getItem error: ${error}`)
        return defaultValue
      }
    },
    removeItem: (key) => window.sessionStorage.removeItem(key),
    clear: () => window.sessionStorage.clear(),
  })

  const createLocalStorage = () => ({
    setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
    getItem: (key, defaultValue = null) => {
      try {
        const json = window.localStorage.getItem(key)
        return json ? JSON.parse(json) : defaultValue
      } catch (error) {
        console.error(`localStorage getItem error: ${error}`)
        return defaultValue
      }
    },
    removeItem: (key) => window.localStorage.removeItem(key),
    clear: () => window.localStorage.clear(),
  })

  const createCookieStorage = () => ({
    setItem: (key, value, expires = null) => {
      let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}; path=/`
      if (expires) {
        const date = new Date()
        date.setTime(date.getTime() + expires * 1000)
        cookieString += `; expires=${date.toUTCString()}`
      }
      document.cookie = cookieString
    },
    getItem: (key, defaultValue = null) => {
      try {
        const cookies = document.cookie.split('; ')
        const cookie = cookies.find(row => row.startsWith(`${encodeURIComponent(key)}=`))
        return cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : defaultValue
      } catch (error) {
        console.error(`Cookie getItem error: ${error}`)
        return defaultValue
      }
    },
    removeItem: (key) => {
      document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    },
    clear: () => {
      document.cookie.split('; ').forEach(cookie => {
        const key = cookie.split('=')[0]
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      })
    },
  })

  const getStorageStrategy = (type) => {
    switch (type) {
    case 'local':
      return createLocalStorage()
    case 'cookie':
      return createCookieStorage()
    case 'session':
    default:
      return createSessionStorage()
    }
  }

  const { setItem, getItem, removeItem, clear } = getStorageStrategy(type)

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}
