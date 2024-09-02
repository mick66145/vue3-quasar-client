export default {
  mounted (el, binding, vnode, prevNode) {
    if (binding.value.url) {
      el.addEventListener('click', () => {
        const a = document.createElement('a')
        //   let url = baseUrl + binding.value // 若是不完整的url則需要拼接baseURL
        const url = binding.value.url // 完整的url則直接使用
        // 這裡是將url轉成blob地址，
        fetch(url, {
          headers: new Headers({
            Origin: location.origin,
            'Access-Control-Allow-Origin': '*',
          }),
          mode: 'cors',
        }).then(res => res.blob()).then(blob => { // 將鏈接地址字符內容轉變成blob地址
          a.href = URL.createObjectURL(blob)
          a.download = binding.value.name || '' // 下載文件的名字
          document.body.appendChild(a)
          a.click()
          // 在資源下載完成後 清除 佔用的緩存資源
          window.URL.revokeObjectURL(a.href)
          document.body.removeChild(a)
        })
      })
    }
  },
}
