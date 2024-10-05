import Configuration from '@/configuration'
import useResource from '@/hooks/useResource'
import request from '@core/utils/request'

const fileBaseUrl = `${Configuration('fileServerHost')}`

export const FileResource = ({
  uri = 'file',
}) => {
  const upload = ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    return request({
      baseURL: `${fileBaseUrl}`,
      url: `/${uri}/upload`,
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri })

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
    upload,
  }
}
