
export const base64ToFile = (base64, filename = 'file') => {
  const arrayBuffer = base64ToArrayBuffer(base64)
  const fileExtension = getFileExtensionFromBase64(base64)
  const blob = new Blob([arrayBuffer], { type: extractMimeType(base64) })
  return new File([blob], `${filename}.${fileExtension}`, { type: blob.type })
}

/**
 * 將 Base64 字符串轉換為 ArrayBuffer
 * @param {string} base64 - Base64 字符串
 * @returns {ArrayBuffer} - 對應的 ArrayBuffer
 */
const base64ToArrayBuffer = (base64) => {
  /**
   * * 去掉 Base64 頭部信息
   * * @param {string} base64 - Base64 字符串
   * * @returns {string} - 去掉頭部信息後的 Base64 字符串
   * */
  const stripBase64Header = (base64) => {
    const base64HeaderPattern = /^data:(.*?);base64,/
    return base64.replace(base64HeaderPattern, '')
  }

  /**
  * 去掉無效字符
  * @param {string} base64 - Base64 字符串
  * @returns {string} - 去掉無效字符後的 Base64 字符串
  */
  const sanitizeBase64 = (base64) => {
    return base64.replace(/\s+/g, '')
  }

  /**
  * 補位處理
  * @param {string} base64 - Base64 字符串
  * @returns {string} - 補位後的 Base64 字符串
  */
  const padBase64 = (base64) => {
    while (base64.length % 4 !== 0) {
      base64 += '='
    }
    return base64
  }

  try {
    // 去掉 Base64 頭部信息
    base64 = stripBase64Header(base64)

    // 去掉無效字符
    base64 = sanitizeBase64(base64)

    // 補位處理
    base64 = padBase64(base64)

    // 使用 atob 進行解碼
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  } catch (error) {
    console.error('Failed to convert Base64 to ArrayBuffer:', error)
    return null
  }
}

/**
 * 從 Base64 字串中判斷文件格式並返回相應的副檔名
 * @param {string} base64 - Base64 字串
 * @returns {string|null} - 文件的副檔名，若無法判斷則返回 null
 */
const getFileExtensionFromBase64 = (base64) => {
  const mimeType = extractMimeType(base64)
  if (!mimeType) {
    console.warn('無法從 Base64 字串中提取 MIME 類型')
    return null
  }
  const extension = getExtensionFromMimeType(mimeType)
  if (!extension) {
    console.warn('無法匹配 MIME 類型與副檔名')
    return null
  }
  return extension
}

/**
 * 從 Base64 字串中提取 MIME 類型
 * @param {string} base64 - Base64 字串
 * @returns {string|null} - 提取到的 MIME 類型，若無法提取則返回 null
 */
const extractMimeType = (base64) => {
  const mimeMatch = base64.match(/^data:(.*?);base64,/)
  return mimeMatch ? mimeMatch[1] : null
}

/**
 * 根據 MIME 類型獲取相應的副檔名
 * @param {string} mimeType - MIME 類型
 * @returns {string|null} - 對應的副檔名，若無法匹配則返回 null
 */
const getExtensionFromMimeType = (mimeType) => {
  const mimeToExtensionMap = {
    // 圖片類型
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/tiff': 'tiff',

    // 音頻類型
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/aac': 'aac',
    'audio/flac': 'flac',

    // 視頻類型
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogv',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',
    'video/x-matroska': 'mkv',

    // 文本類型
    'text/plain': 'txt',
    'text/html': 'html',
    'text/css': 'css',
    'text/javascript': 'js',
    'text/xml': 'xml',

    // 應用程序文件類型
    'application/json': 'json',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/gzip': 'gz',
    'application/x-tar': 'tar',
    'application/x-rar-compressed': 'rar',

    // 文件格式
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',

    // 壓縮文件類型
    'application/x-7z-compressed': '7z',

    // 字體文件類型
    'font/otf': 'otf',
    'font/ttf': 'ttf',
    'font/woff': 'woff',
    'font/woff2': 'woff2',

    // 二進制文件類型
    'application/octet-stream': 'bin',
  }

  return mimeToExtensionMap[mimeType] || null
}
