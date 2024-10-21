import Base from '@core/models/modules/Base'
import useBatchUpload from '@/hooks/useBatchUpload'

const BaseFile = () => ({
  ...Base(),
  // api欄位
  id: '',
  mime: '',
  name: '',
  size: '',
  url: '',
})

const BaseFileModel = (item = null) => {
  const model = (item) => {
    return {
      // api欄位
      id: item?.id || '',
      mime: item?.mime || '',
      name: item?.name || '',
      size: item?.size || '',
      url: item?.url || '',
    }
  }
  return model(item || BaseFile())
}

const BaseFileObjViewModel = (item = null) => {
  const { batchUpload } = useBatchUpload()
  const model = (item) => {
    return {
      file: item?.file || '',
      file_obj: item?.file_obj !== undefined ? item?.file_obj : ((item?.file && Object.keys(item?.file).length !== 0) ? { ...BaseFileModel(item?.file) } : ''),
      async uploadFile () {
        if (this.file_obj?.raw) {
          const [uploadRes] = await batchUpload({ fileObj: this.file_obj })
          if (uploadRes && uploadRes.fileObj) {
            this.file_obj.id = uploadRes.fileObj.id
          }
        }
      },
      setFile () {
        this.file = this.file_obj
      },
    }
  }

  return model(item)
}

export default BaseFileObjViewModel
