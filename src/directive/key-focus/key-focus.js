export default {
  mounted (el, binding, vnode, prevNode) {
    el.addEventListener('keydown', (event) => {
      if (binding.value?.key) {
        if (event.key === binding.value.key) {
          const inputs = document.getElementsByTagName('input')
          const elInput = el.getElementsByTagName('input')[0]
          const currentInputIndex = Array.from(inputs).indexOf(elInput)
          const nextInputIndex = (currentInputIndex + 1) % inputs.length
          inputs[nextInputIndex].focus()
        }
      }
    })
  },
}
