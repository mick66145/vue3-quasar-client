import { reactive, ref, onMounted } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useServerDataTable ({
  searchParames = {},
  sortParames = [], // [{field:string,order:true|false}]
  unSessionStorageParames = [], // [{field:string}]
  sessionStorageKey = 'dashboardServerDataTable',
  usePageSize = true,
  callback = () => {},
}) {
  const { setSessionStorage, getSessionStorage } = useSessionStorage()

  let sessionStorage = getSessionStorage(sessionStorageKey)
  const search = reactive({})
  const data = ref([])
  const total = ref(0)
  const sort = ref([])
  const unSessionStorageParamesField = unSessionStorageParames.map((item) => item.field)

  const onChangePage = async (page) => {
    search.page = page
    setSessionStorage(sessionStorageKey, { search })
    await setCallback()
  }

  const onChangePageSize = async (pageSize) => {
    search.page_size = pageSize
    setSessionStorage(sessionStorageKey, { search })
    await setCallback()
  }

  const onChangeFilter = async () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
    await setCallback()
  }

  const onReset = async () => {
    for (const [key, value] of Object.entries(searchParames)) {
      search[key] = value
    }
    search.page = 1
    usePageSize && (search.page_size = 10)
    search.orderby = sortParames.map((item) => `${item.field}:${item.order}`).join(',')
    sort.value = sortParames
    setSessionStorage(sessionStorageKey, { search })
    await setCallback()
  }

  const onRefresh = async () => {
    await setCallback()
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

    for (const [key, value] of Object.entries(searchParames)) {
      (!sessionStorage.search[key] && !unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }

    for (const [key, value] of Object.entries(searchParames)) {
      (unSessionStorageParamesField.includes(key)) && (search[key] = value)
    }
    await setCallback()
  })

  return {
    search,
    data,
    total,
    onChangePage,
    onChangePageSize,
    onChangeFilter,
    onReset,
    onRefresh,
  }
}
