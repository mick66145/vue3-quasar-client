import Configuration from '@/configuration'

export default function useFileStorage () {
  const fileBaseUrl = `${Configuration('fileServerHost')}`

  const getFileSrc = ({ id, showType = 'd' }) => {
    if (!id) return ''
    const url = `${fileBaseUrl}/file/${showType}/${id}`
    return url
  }

  return {
    getFileSrc,
  }
}
