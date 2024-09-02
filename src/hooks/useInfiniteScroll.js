import { reactive, ref, onMounted } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useInfiniteScroll ({
  searchParames = {},
  unSessionStorageParames = [], // [{field:string}]
  sessionStorageKey = 'clientFrontendInfiniteScroll',
  callback = () => {},
}) {
  // use
  const { setSessionStorage, getSessionStorage } = useSessionStorage()

  // data
  const infiniteScroll = ref()
  let sessionStorage = getSessionStorage(sessionStorageKey)
  const search = reactive({})
  const data = ref([])
  const total = ref(0)
  const unSessionStorageParamesField = unSessionStorageParames.map((item) => item.field)

  // methods

  const onChangePage = async () => {
    if ((total.value >= data.value.length) && (total.value !== data.value.length)) {
      search.page = search.page += 1
      setSessionStorage(sessionStorageKey, { search })
      if (callback && typeof (callback) === 'function') {
        const [res] = await callback()
        if (res) {
          data.value.push(...res.list)
          total.value = res.total
        }
      }
    } else {
      infiniteScroll.value.stop()
    }
  }
  const onChangePageSize = async (pageSize) => {
    search.page = 1
    search.page_size = pageSize
    infiniteScroll.value.resume()
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      const [res] = await callback()
      if (res) {
        data.value = []
        data.value.push(...res.list)
        total.value = res.total
      }
    }
  }
  const onChangeFilter = async () => {
    search.page = 1
    infiniteScroll.value.resume()
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      const [res] = await callback()
      if (res) {
        data.value = []
        data.value.push(...res.list)
        total.value = res.total
      }
    }
  }

  const onReset = async () => {
    for (const [key, value] of Object.entries(searchParames)) {
      search[key] = value
    }
    search.page = 1
    search.page_size = 10
    infiniteScroll.value.resume()
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      const [res] = await callback()
      if (res) {
        data.value = []
        data.value.push(...res.list)
        total.value = res.total
      }
    }
  }

  // mounted
  onMounted(async () => {
    if (!sessionStorage) {
      const sessionStorageObj = {
        search: {
          page_size: 10,
        },
      }
      setSessionStorage(sessionStorageKey, sessionStorageObj)
      sessionStorage = getSessionStorage(sessionStorageKey)
    }

    mapKeys(sessionStorage.search, (_, key) => {
      search[key] = sessionStorage.search[key]
    })

    for (const [key, value] of Object.entries(searchParames)) {
      (!sessionStorage.search[key] && !unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }

    setSessionStorage(sessionStorageKey, { search })

    search.page = 1
    for (const [key, value] of Object.entries(searchParames)) {
      (unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }

    if (callback && typeof (callback) === 'function') {
      const [res] = await callback()
      if (res) {
        data.value = []
        data.value.push(...res.list)
        total.value = res.total
      }
    }
  })

  return {
    infiniteScroll,
    search,
    data,
    total,
    onChangePage,
    onChangePageSize,
    onChangeFilter,
    onReset,
  }
}
