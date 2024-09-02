import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export default function useDeltaConvert () {
  const renderHtml = (ops) => {
    const converter = new QuillDeltaToHtmlConverter(ops)
    converter.renderCustomWith(function (customOp, contextOp) {
      if (customOp.insert.type === 'imageBlotAlt') {
        const val = customOp.insert.value
        return `<img class="image-blot" src="${val.src}" alt="${val.alt || ''}" width="${val.width || ''}" height="${val.height || ''}" data-caption="${val.caption || ''}"></img>`
      } else {
        return 'Unmanaged custom blot!'
      }
    })
    return converter.convert()
  }
  return { renderHtml }
}
