
import { FileResource } from '@core/modules/file/api'
import { useApp } from '@/stores/app'

const fileResource = FileResource({})

export default function useBatchUpload () {
  const batchUpload = async (payload) => {
    return await batchUploadCommon(payload, 'file')
  }

  const uploadResource = async (key, value, resUpload, errors, resourceType) => {
    try {
      if (!value) {
        resUpload[key] = value
        return
      }
      if (value.raw) {
        const uploadFunction = fileResource.upload({ file: value.raw }).then(res => res.data)
        const response = await uploadFunction
        resUpload[key] = response.data
      } else {
        resUpload[key] = value
      }
    } catch (error) {
      console.error(`Error uploading ${resourceType}:`, error)
      resUpload[key] = value
      errors.push({ key, error })
    }
  }

  const batchUploadCommon = async (payload, resourceType) => {
    const storeApp = useApp()
    const resUpload = {}
    const errors = []
    storeApp.isCreate = true

    for (const [key, value] of Object.entries(payload)) {
      await uploadResource(key, value, resUpload, errors, resourceType)
    }

    storeApp.isCreate = false
    return [resUpload, errors]
  }

  return {
    batchUpload,
  }
}
