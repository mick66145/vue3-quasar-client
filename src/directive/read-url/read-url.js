import useFileStorage from '@/hooks/useFileStorage'

export default {
  mounted (el, binding, vnode, prevNode) {
    if (binding.value.url || binding.value.id) {
      const { getFileSrc } = useFileStorage()

      el.addEventListener('click', () => {
        const a = document.createElement('a')
        //   const url = baseUrl + binding.value // 若是不完整的url則需要拼接baseURL
        const url = binding.value.id ? getFileSrc({ id: binding.value.id, showType: 'r' }) : binding.value.url // 完整的url則直接使用
        a.target = '_blank'
        a.href = url
        a.click()
      })
    }
  },
}
