import { ref } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'
import useQuickState from '@/hooks/useQuickState'
import mapKeys from 'lodash-es/mapKeys'
export default function useDialog ({
  formData,
  createFetch,
  createSuccess = '新增成功',
  createFail = '新增失敗',

  readFetch,
  readSuccess = '讀取成功',
  readFail = '讀取失敗',

  updateFetch,
  updateSuccess = '編輯成功',
  updateFail = '編輯失敗',

  deleteFetch,
  deleteSuccess = '刪除成功',
  deleteFail = '刪除失敗',

  readListFetch,
  readListSuccess = '讀取列表成功',
  readListFail = '讀取列表失敗',

  showDialogCallback = () => {},
}) {
  // data
  const form = ref()
  const dialog = ref()
  const data = useQuickState(formData)
  const id = ref(null)
  const mode = ref() // create、edit、delete
  const isShowDialog = ref(false)

  // methods
  const showDialog = async ({
    id: dataId = null,
    data: rowData = null,
    mode: dialogMode = 'create',
    callRead = false,
    callReadList = false,
    payload = null,
  }) => {
    id.value = dataId
    mode.value = dialogMode
    if (rowData) {
      if (Array.isArray(rowData)) {
        data.state.list = rowData
        data.state.total = rowData.length
      } else {
        mapKeys(rowData, (_, key) => {
          data.state[key] = rowData[key] === undefined ? (data.state[key] !== undefined ? data.state[key] : '') : rowData[key]
        })
      }
    }
    if (callRead) {
      const [res] = await callReadFetch(dataId, payload)
      if (res) {
        mapKeys(res, (_, key) => {
          data.state[key] = res[key] === undefined ? (data.state[key] !== undefined ? data.state[key] : '') : res[key]
        })
      }
    }
    if (callReadList) {
      const [res] = dataId ? await callReadListFetch(dataId, payload) : await callReadListFetch(payload)
      if (res) {
        data.state.list = res.list
        data.state.total = res.total
      }
    }
    showDialogCallback()
    isShowDialog.value = true
  }
  const hideDialog = () => {
    data.reset()
    isShowDialog.value = false
  }
  const save = async () => {
    return await form.value.validate().then(async (success) => {
      if (success) {
        const payload = { ...data.state }
        const urlObj = {
          create: () => {
            if (id.value) {
              return callCreateFetch(id.value, { ...payload })
            } else {
              return callCreateFetch({ ...payload })
            }
          },
          edit: () => {
            if (id.value) {
              return callUpdateFetch(id.value, { ...payload })
            } else {
              return callUpdateFetch({ ...payload })
            }
          },
          delete: () => {
            if (id.value) {
              return callDeleteFetch(id.value, { ...payload })
            } else {
              return callDeleteFetch({ ...payload })
            }
          },
        }
        const [res, error] = await urlObj[mode.value]()
        hideDialog()
        return [res, error]
      } else {
        return [null, null]
      }
    })
  }

  // use
  const { callCreateFetch, callReadFetch, callUpdateFetch, callDeleteFetch, callReadListFetch } = useCRUD({
    readFetch,
    createFetch,
    updateFetch,
    deleteFetch,
    readListFetch,
    createSuccess,
    readSuccess,
    updateSuccess,
    deleteSuccess,
    readListSuccess,
    createFail,
    readFail,
    updateFail,
    deleteFail,
    readListFail,
  })

  return {
    form,
    dialog,
    mode,
    data,
    isShowDialog,
    showDialog,
    hideDialog,
    save,
  }
}
