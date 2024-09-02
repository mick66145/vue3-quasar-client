import { reactive, ref, onMounted } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useVxeServerDataTable ({
  searchParames = {},
  sortParames = [], // [{field:string,order:true|false}]
  unSessionStorageParames = [], // [{field:string}]
  sessionStorageKey = 'dashboardVxeServerDataTable',
  usePageSize = true,
  callback = () => {},
}) {
  // use
  const { setSessionStorage, getSessionStorage } = useSessionStorage()

  // data
  let sessionStorage = getSessionStorage(sessionStorageKey)
  const dataTable = ref()
  const search = reactive({})
  const data = ref([])
  const total = ref(0)
  const sort = ref([])
  const unSessionStorageParamesField = unSessionStorageParames.map((item) => item.field)

  // methods

  const onChangePage = (page) => {
    search.page = page
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    setCallback()
  }
  const onChangePageSize = (pageSize) => {
    search.page_size = pageSize
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    setCallback()
  }
  const onChangeFilter = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    setCallback()
    dataTable.value && (dataTable.value.clearAllCheckboxRow())
  }
  const onChangeSort = ({ sortList }) => {
    search.page = 1
    if (sortList.length > 0) {
      search.orderby = sortList.map((item) => `${item.field}:${item.order}`).join(',')
      sort.value = sortList
    } else {
      search.orderby = sortParames.map((item) => `${item.field}:${item.order}`).join(',')
      sort.value = sortParames
    }
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    setCallback()
  }
  const onReset = () => {
    for (const [key, value] of Object.entries(searchParames)) {
      search[key] = value
    }
    search.page = 1
    usePageSize && (search.page_size = 10)
    search.orderby = sortParames.map((item) => `${item.field}:${item.order}`).join(',')
    sort.value = sortParames
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    setCallback()
    dataTable.value && (sessionStorage.sort.forEach((item) => { dataTable.value.sort(item) }))
    dataTable.value && (dataTable.value.clearAllCheckboxRow())
  }
  const onRefresh = () => {
    setCallback()
  }
  const setCallback = async () => {
    if (callback && callback instanceof Function) {
      const callObj = await callback()
      if (callObj instanceof Object) {
        const [res] = callObj
        if (res) {
          data.value = []
          data.value = res.list
          total.value = res.total
        }
      }
    }
  }

  // mounted
  onMounted(async () => {
    if (!sessionStorage) {
      const sessionStorageObj = {
        search: {
          page: 1,
          page_size: usePageSize ? 10 : null,
          orderby: sortParames.map((item) => `${item.field}:${item.order}`).join(','),
        },
        sort: sortParames,
      }
      setSessionStorage(sessionStorageKey, sessionStorageObj)
      sessionStorage = getSessionStorage(sessionStorageKey)
    }

    mapKeys(sessionStorage.search, (_, key) => {
      search[key] = sessionStorage.search[key]
    })

    sort.value = sessionStorage.sort

    for (const [key, value] of Object.entries(searchParames)) {
      (!sessionStorage.search[key] && !unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }

    setSessionStorage(sessionStorageKey, { search, sort: sort.value })

    for (const [key, value] of Object.entries(searchParames)) {
      (unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }
    setCallback()
    dataTable.value && (sessionStorage.sort.forEach((item) => { dataTable.value.sort(item) }))
  })

  return {
    dataTable,
    search,
    data,
    total,
    onChangePage,
    onChangePageSize,
    onChangeFilter,
    onChangeSort,
    onReset,
    onRefresh,
  }
}
