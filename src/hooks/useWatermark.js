
export default function useWatermark ({
  container,
  text,
  zIndex = 9999,
  width = 120,
  height = 64,
  opacity = 0.15,
  rotate = -22,
  translateX = -50,
  translateY = 20,
  fontSize = 16,
  fontWeight = 100,
  fontColor = '#f5f5f5',
  fontFamily = 'Microsoft JhengHei',
  monitor = true,
  offsetBottom = 0,
  offsetLeft = 0,
  watermarkWidth = '100vw',
  watermarkHeight = '100vh',
}) {
  const show = () => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.display = 'none'

    const shuiyin = canvas.getContext('2d')
    // 控製文字的旋轉角度和上下位置
    shuiyin.rotate(rotate * Math.PI / 180)
    shuiyin.translate(translateX, translateY)
    // 文字顏色
    shuiyin.fillStyle = fontColor
    // 文字樣式
    shuiyin.font = `${fontWeight} ${fontSize}px ${fontFamily}`
    shuiyin.fillText(text, canvas.width / 3, canvas.height / 2)

    /* 新建一個用於填充canvas浮水印的標籤，之所以沒有直接在body上添加，是因為z-index對個別內容影響，才考慮的不用body */
    const watermark = document.createElement('div')
    const basicStyleStr = `pointer-events:none;background-repeat:repeat;mix-blend-mode:multiply;background-image:url('${canvas.toDataURL('image/png')}');z-index:${zIndex};`
    const styleStr = container ? 'width:100%;height:100%' : `width:${watermarkWidth};height:${watermarkHeight};position:fixed;bottom:${offsetBottom};left:${offsetLeft}`
    const watermarkStyleStr = `${basicStyleStr}${styleStr}`
    watermark.setAttribute('style', watermarkStyleStr)
    watermark.classList.add('watermark')
    container ? container.appendChild(watermark) : document.body.appendChild(watermark)

    // 此方法是防止使用者透過控制台修改樣式去除浮水印效果
    /* MutationObserver 是一個可以監聽DOM結構變化的介面。 */
    if (monitor) {
      const observer = new MutationObserver(() => {
        const wmInstance = document.querySelector('.watermark')
        if ((wmInstance && wmInstance.getAttribute('style') !== watermarkStyleStr) || !wmInstance) {
        // 如果標籤在，只修改了屬性，重新賦值屬性
          if (wmInstance) {
            wmInstance.setAttribute('style', watermarkStyleStr)
          }
        }
      })
      observer.observe(container || document.body, {
        attributes: true,
        subtree: true,
        childList: true,
      })
    }
  }
  const hide = () => {
    /* 關閉頁面的浮水印，即要移除浮水印標籤 */
    const watermark = document.querySelector('.watermark')
    container ? container.removeChild(watermark) : document.body.removeChild(watermark)
  }

  return {
    show,
    hide,
  }
}
