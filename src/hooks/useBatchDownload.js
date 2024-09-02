import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { groupBy } from '@/utils/lodash'
import useCRUD from '@/hooks/useCRUD'

export default function useBatchDownload ({
  payload = null,
  readFetch,
  options = [],
  urls = [], // [{url:string,filename:string}]
  zipName = '壓縮',
}) {
  const batchDownload = async () => {
    const zip = new JSZip()
    const files = zip.folder(zipName)
    const fileList = []
    for (const [index, item] of Object.entries(options)) {
      let res, error
      if (!item.id && !payload) { [res, error] = await callReadFetch() }
      if (item.id && payload) { [res, error] = await callReadFetch(item.id, payload) }
      if (item.id && !payload) { [res, error] = await callReadFetch(item.id) }
      if (!item.id && payload) { [res, error] = await callReadFetch(payload) }
      if (res) {
        const { headers, data } = res
        const contentDisposition = headers['content-disposition']
        const fileName = getFileName(contentDisposition)
        fileList.push({ fileName: fileName, blob: data })
      }
    }
    const groupFileList = groupBy(fileList, 'fileName')
    for (const [groupKey, groupItem] of Object.entries(groupFileList)) {
      const fileName = groupKey.split('.')[0]
      const fileType = groupKey.split('.')[1]
      for (const [fileKey, fileItem] of Object.entries(groupItem)) {
        files.file(`${fileKey === '0' ? groupKey : `${fileName}(${fileKey}).${fileType}`}`, fileItem.blob)
      }
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, zipName)
    })
  }

  const batchDownloadByUrl = async () => {
    const zip = new JSZip()
    const files = zip.folder(zipName)
    const fileList = []
    for (const [index, urlItem] of Object.entries(urls)) {
      const { url, filename } = urlItem
      const res = await fetch(url)
      if (res) {
        const { headers } = res
        const data = res.blob()
        const contentDisposition = headers.get('content-disposition')
        const fileName = getFileName(contentDisposition)
        const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
        const downloadFileName = filename ? `${filename}.${fileType}` : fileName
        fileList.push({ fileName: downloadFileName, blob: data })
      }
    }
    const groupFileList = groupBy(fileList, 'fileName')
    for (const [groupKey, groupItem] of Object.entries(groupFileList)) {
      const fileName = groupKey.split('.')[0]
      const fileType = groupKey.split('.')[1]
      for (const [fileKey, fileItem] of Object.entries(groupItem)) {
        files.file(`${fileKey === '0' ? groupKey : `${fileName}(${fileKey}).${fileType}`}`, fileItem.blob)
      }
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, zipName)
    })
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
    batchDownload,
    batchDownloadByUrl,
  }
}
