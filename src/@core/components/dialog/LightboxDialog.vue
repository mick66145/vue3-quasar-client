<template>
  <photo-slider
    :items="options"
    :visible="isShowDialog"
    :index="slide"
    @clickMask="hideDialog"
    @closeModal="hideDialog"
    @changeIndex="changeIndex"
  />
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  props: {
    options: { type: Array, default () { /* { src:"",key:"",intro:"" } */ return [] } },
  },
  setup () {
    // data
    const slide = ref(0)

    // methods
    const showDialog = async ({ slide: slideData = 0 }) => {
      slide.value = slideData
      isShowDialog.value = true
    }
    const changeIndex = (index) => {
      slide.value = index
    }

    // use
    const { isShowDialog, hideDialog } = useDialog({})

    return {
      slide,
      isShowDialog,
      changeIndex,
      showDialog,
      hideDialog,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
