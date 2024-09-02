import { reactive, ref, watch } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import XEUtils from 'xe-utils'
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
    setSessionStorage(sessionStorageKey, { search })
  }

  const onChangeFilter = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
  }

  const onKeywordSearch = (keyword) => {
    const filterName = XEUtils.toValueString(keyword).trim().toLowerCase()
    if (filterName) {
      const searchProps = _(tableFields).map('field').value()
      const rest = originalData.value.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
      data.value = rest.map(row => {
        const item = Object.assign({}, row)
        searchProps.forEach(key => {
          item[key] = XEUtils.toValueString(item[key])
        })
        return item
      })
    } else {
      data.value = originalData.value
    }
    setSessionStorage(sessionStorageKey, { search, keyword: keyword })
  }

  const onReset = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
  }

  // watch
  watch(() => originalData.value, (newValue) => {
    data.value = newValue
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
