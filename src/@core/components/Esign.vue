<template>
  <vue-esign
    ref="esign"
    :bgColor="bgColor"
    :width="width"
    :height="height"
    :isCrop="isCrop"
    :lineWidth="lineWidth"
    :lineColor="lineColor"
  />
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { base64ToFile } from '@/utils/file'

export default defineComponent({
  props: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 300 },
    lineColor: { type: String, default: '#000000' },
    lineWidth: { type: Number, default: 6 },
    bgColor: { type: String, default: '' },
    isCrop: { type: Boolean, default: false },
  },
  setup () {
    // data
    const esign = ref()

    const reset = () => {
      esign.value.reset()
    }
    const generate = async () => {
      const handleGenerate = () => {
        return new Promise((resolve) => {
          esign.value.generate()
            .then(res => resolve(res))
            .catch(err => resolve(null))
        })
      }
      return await handleGenerate()
    }
    const generateAsBase = async () => await generate()
    const generateAsFile = async () => {
      const base64 = await generate()
      return base64 ? base64ToFile(base64, 'esign') : null
    }

    return {
      esign,
      reset,
      generate,
      generateAsBase,
      generateAsFile,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
