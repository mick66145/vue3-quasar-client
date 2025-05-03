import Base from '@core/models/modules/Base'
import useBatchUpload from '@/hooks/useBatchUpload'

const BaseMedia = (mediaConfig = {}) => {
  return {
    ...Base(),
    // api欄位
    id: '',
    mime: '',
    name: '',
    size: '',
    url: '',
    ...mediaConfig.extraFields,
  }
}

const BaseMediaModel = (mediaConfig = {}, item = null) => {
  const model = (item) => {
    const baseFields = {
      id: item?.id || '',
      mime: item?.mime || '',
      name: item?.name || '',
      size: item?.size || '',
      url: item?.url || '',
    }
    const extraFields = {}
    for (const field of mediaConfig.extraFields || []) {
      extraFields[field] = item?.[field] || ''
    }
    return {
      ...baseFields,
      ...extraFields,
    }
  }
  return model(item || BaseMedia(mediaConfig))
}

const BaseMediaViewModel = (mediaConfig = {}, item = null) => {
  const { batchUpload } = useBatchUpload()
  const mediaKey = mediaConfig.key || 'media'
  const objKey = `${mediaKey}_obj`

  const model = (item) => {
    return {
      [mediaKey]: item?.[mediaKey] || '',
      [objKey]: item?.[objKey] !== undefined ? item?.[objKey] : (item?.[mediaKey] && Object.keys(item?.[mediaKey]).length !== 0 ? { ...BaseMediaModel(mediaConfig, item?.[mediaKey]) } : ''),
      async uploadMedia () {
        if (this[objKey]?.raw) {
          const [uploadRes] = await batchUpload({ [`${mediaKey}Obj`]: this[objKey] })
          if (uploadRes && uploadRes[`${mediaKey}Obj`]) {
            this[objKey].id = uploadRes[`${mediaKey}Obj`].id
          }
        }
      },
      setMedia () {
        this[mediaKey] = this[objKey]
      },
    }
  }

  return model(item)
}

export default BaseMediaViewModel
