import Configuration from '@/configuration'

export default function useImgStorage () {
  const fileBaseUrl = `${Configuration('fileServerHost')}`
  const getImageSrc = ({ filename, size = '100x' }) => {
    if (!filename) return ''
    const url = `${fileBaseUrl}/display/resize/${size}/${filename}`
    return url
  }

  return {
    getImageSrc,
  }
}
