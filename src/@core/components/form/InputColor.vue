<template>
  <input-text v-model="observeValue">
    <template #append>
      <q-icon name="colorize" class="cursor-pointer" />
    </template>
    <template #before>
      <div v-show="observeValue" style="width: 20px; height: 20px;" :style="`backgroundColor: ${observeValue}`" />
    </template>
    <template #default>
      <q-popup-proxy
        v-model="show"
        class="flex justify-center"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-color
          v-model="observeValue"
          :default-view="defaultView"
          :no-footer="noFooter"
          :no-header-tabs="noHeaderTabs"
          :format-model="formatModel"
        />
      </q-popup-proxy>
    </template>
  </input-text>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: String },
    defaultView: { type: String, default: 'spectrum' },
    formatModel: { type: String, default: 'hexa' },
    noFooter: { type: Boolean, default: false },
    noHeaderTabs: { type: Boolean, default: true },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const show = ref(false)
    const observeValue = useVModel(props, 'modelValue', emit)

    // methods
    const showPopup = (isShow) => {
      setTimeout(() => {
        show.value = isShow
      }, '200')
    }
    const updateModelValue = (value, reason, details) => {
      if (value) showPopup(false)
    }

    return {
      show,
      observeValue,
      updateModelValue,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
