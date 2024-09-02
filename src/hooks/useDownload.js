import FileSaver from 'file-saver'
import useCRUD from '@/hooks/useCRUD'

export default function useDownload ({
  id = null,
  payload = null,
  readFetch,
  filename = null,
  url = null,
}) {
  const download = async () => {
    let res, error
    if (!id && !payload) { [res, error] = await callReadFetch() }
    if (id && payload) { [res, error] = await callReadFetch(id, payload) }
    if (id && !payload) { [res, error] = await callReadFetch(id) }
    if (!id && payload) { [res, error] = await callReadFetch(payload) }
    if (res) {
      const { headers, data } = res
      const contentDisposition = headers['content-disposition']
      const fileName = getFileName(contentDisposition)
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      const downloadFileName = filename ? `${filename}.${fileType}` : fileName
      FileSaver.saveAs(data, downloadFileName)
    }
    return [res, error]
  }

  const downloadByUrl = async () => {
    const res = await fetch(url)
    if (res) {
      const { headers } = res
      const data = await res.blob()
      const contentDisposition = headers.get('content-disposition')
      const fileName = getFileName(contentDisposition)
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      const downloadFileName = filename ? `${filename}.${fileType}` : fileName
      FileSaver.saveAs(data, downloadFileName)
    }
  }

  const getFileName = (disposition) => {
    const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i
    const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i
    let fileName = null
    if (utf8FilenameRegex.test(disposition)) {
      fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)[1])
    } else {
      const filenameStart = disposition.toLowerCase().indexOf('filename=')
      if (filenameStart >= 0) {
        const partialDisposition = disposition.slice(filenameStart)
        const matches = asciiFilenameRegex.exec(partialDisposition)
        if (matches != null && matches[2]) {
          fileName = matches[2]
        }
      }
    }
    return fileName
  }

  // use
  const { callReadFetch } = useCRUD({
    readFetch: readFetch,
    isShowReadFail: false,
  })

  return {
    download,
    downloadByUrl,
  }
}
