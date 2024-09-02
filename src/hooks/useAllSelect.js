import { ref, watch } from 'vue-demi'

export default function useAllSelect ({
  data: allSelectData = [],
}) {
  // data
  const allSelectd = ref(false)
  const data = ref(allSelectData)
  const selection = ref([])

  // methods
  const onSelectAll = () => {
    selection.value = allSelectd.value ? data.value : []
  }
  const setAllSelectData = (allSelectData) => {
    data.value = allSelectData
  }

  // watch
  watch(() => selection.value, () => {
    allSelectd.value = selection.value.length === data.value.length
  })

  return {
    allSelectd,
    selection,
    setAllSelectData,
    onSelectAll,
  }
}
