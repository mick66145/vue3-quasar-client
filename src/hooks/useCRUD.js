import { useAsyncState } from '@vueuse/core'
import { ref, computed } from 'vue-demi'
import useNotify from './useNotify'
import { useApp } from '@/stores/app'

export default function useCRUD ({
  createFetch,
  createSuccess = '新增成功',
  createFail = '新增失敗',
  isShowCreateSuccess = true,
  isShowCreateFail = true,

  readFetch,
  readSuccess = '讀取成功',
  readFail = '讀取失敗',
  isShowReadSuccess = false,
  isShowReadFail = true,

  updateFetch,
  updateSuccess = '編輯成功',
  updateFail = '編輯失敗',
  isShowUpdateSuccess = true,
  isShowUpdateFail = true,

  deleteFetch,
  deleteSuccess = '刪除成功',
  deleteFail = '刪除失敗',
  isShowDeleteSuccess = true,
  isShowDeleteFail = true,

  readListFetch,
  readListSuccess = '讀取列表成功',
  readListFail = '讀取列表失敗',
  isShowReadListSuccess = false,
  isShowReadListFail = true,
}) {
  // data
  const form = ref()
  const storeApp = useApp()
  const reqCreate = useAsyncStateWithOptions(createFetch)
  const reqRead = useAsyncStateWithOptions(readFetch)
  const reqUpdate = useAsyncStateWithOptions(updateFetch)
  const reqDelete = useAsyncStateWithOptions(deleteFetch)
  const reqReadList = useAsyncStateWithOptions(readListFetch)

  // computed
  const isLoading = computed(() => reqCreate.isLoading.value || reqRead.isLoading.value || reqUpdate.isLoading.value || reqDelete.isLoading.value || reqReadList.isLoading.value)
  const isReading = computed(() => reqRead.isLoading.value)
  const isReadingList = computed(() => reqReadList.isLoading.value)
  const isCreate = computed(() => reqCreate.isLoading.value)
  const isUpdate = computed(() => reqUpdate.isLoading.value)
  const isDelete = computed(() => reqDelete.isLoading.value)

  const callCreateFetch = async (id = null, payload) => {
    storeApp.isLoading = true
    storeApp.isCreate = true
    const res = await reqCreate.execute(0, id, payload)
    if (reqCreate.error.value) {
      return handleApiError(reqCreate, 'isCreate', createFail, isShowCreateFail)
    } else {
      return handleApiSuccess('isCreate', createSuccess, isShowCreateSuccess, res || true)
    }
  }
  const callReadFetch = async (id = null, payload = null) => {
    storeApp.isLoading = true
    storeApp.isReading = true
    const res = await reqRead.execute(0, id, payload)
    if (reqRead.error.value) {
      return handleApiError(reqRead, 'isLoading', readFail, isShowReadFail)
    } else {
      return handleApiSuccess('isReading', readSuccess, isShowReadSuccess, res || true)
    }
  }
  const callUpdateFetch = async (id, payload = null) => {
    storeApp.isLoading = true
    storeApp.isUpdate = true
    const res = await reqUpdate.execute(0, id, payload)
    if (reqUpdate.error.value) {
      return handleApiError(reqUpdate, 'isUpdate', updateFail, isShowUpdateFail)
    } else {
      return handleApiSuccess('isUpdate', updateSuccess, isShowUpdateSuccess, res || true)
    }
  }
  const callDeleteFetch = async (id) => {
    storeApp.isLoading = true
    storeApp.isDelete = true
    const res = await reqDelete.execute(0, id)
    if (reqDelete.error.value) {
      return handleApiError(reqDelete, 'isDelete', deleteFail, isShowDeleteFail)
    } else {
      return handleApiSuccess('isDelete', deleteSuccess, isShowDeleteSuccess, res || true)
    }
  }
  const callReadListFetch = async (id = null, payload = null) => {
    storeApp.isReadingList = true
    const res = await reqReadList.execute(0, id, payload)
    if (reqReadList.error.value) {
      return handleApiError(reqReadList, 'isReadingList', readListFail, isShowReadListFail)
    } else {
      return handleApiSuccess('isReadingList', readListSuccess, isShowReadListSuccess, res || true)
    }
  }
  const handleApiError = (request, actionType, errorMessage, showError = true) => {
    storeApp.isLoading = false
    storeApp[actionType] = false
    storeApp.isSubmit = false

    const message = extractErrorMessage(request)
    if (showError) {
      notifyAPIError({ message: message || errorMessage })
    }

    return [null, request.error.value]
  }
  const handleApiSuccess = (actionType, successMessage, showSuccess = true, result = true) => {
    storeApp.isLoading = false
    storeApp[actionType] = false
    storeApp.isSubmit = false

    if (showSuccess) {
      notify({ message: successMessage, type: 'positive' })
    }

    return [result, null]
  }
  const extractErrorMessage = (request) => {
    return (
      request.error.value.response.data.error?.message || request.error.value.response.data.message || JSON.parse(request.error.value.request.responseText)?.error?.message || request.error.value
    )
  }
  function useAsyncStateWithOptions (fetchFn, options) {
    return useAsyncState(fetchFn, {}, { immediate: false, ...options })
  };

  // use
  const { notify, notifyAPIError } = useNotify()

  return {
    form,
    isLoading,
    isReading,
    isReadingList,
    isCreate,
    isUpdate,
    isDelete,
    callCreateFetch,
    callReadFetch,
    callUpdateFetch,
    callDeleteFetch,
    callReadListFetch,
  }
}
