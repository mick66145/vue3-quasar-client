import { reactive, ref, watch } from 'vue-demi'
import useSessionStorage from './useSessionStorage'

import _ from 'lodash-es'
export default function useClientDataTable ({
  searchParames = {},
  sessionStorageKey = 'dashboardClientDataTable',
  tableFields = [],
}) {
  const { setSessionStorage, getSessionStorage } = useSessionStorage()
  let sessionStorage = getSessionStorage(sessionStorageKey)
  if (!sessionStorage) {
    const sessionStorageObj = {
      search: {
        page: 1,
        page_size: 10,
      },
    }
    setSessionStorage(sessionStorageKey, sessionStorageObj)
    sessionStorage = getSessionStorage(sessionStorageKey)
  }
  for (const [key, value] of Object.entries(searchParames)) {
    !sessionStorage.search[key] && (sessionStorage.search[key] = value)
    key === 'page_size' && (sessionStorage.search[key] = value)
  }
  setSessionStorage(sessionStorageKey, sessionStorage)

  const search = reactive(sessionStorage.search)
  const originalData = ref(sessionStorage.data)
  const data = ref([])
  const total = ref(0)

  const onChangePage = (page) => {
    search.page = page
    data.value = getData()
    setSessionStorage(sessionStorageKey, { search })
  }

  const onChangeFilter = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
  }

  const onKeywordSearch = (keyword) => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search, keyword: keyword })
  }

  const onReset = () => {
    search.page = 1
    data.value = getData()
    setSessionStorage(sessionStorageKey, { search })
  }

  const getData = () => {
    const startIndex = (search.page - 1) * search.page_size
    const endIndex = startIndex + search.page_size
    return originalData.value.slice(startIndex, endIndex)
  }

  // watch
  watch(() => originalData.value, (newValue) => {
    data.value = getData()
  })

  return {
    search,
    data,
    originalData,
    total,
    onChangePage,
    onChangeFilter,
    onReset,
    onKeywordSearch,
  }
}
