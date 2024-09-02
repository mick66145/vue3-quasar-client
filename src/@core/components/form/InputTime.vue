<template>
  <input-text
    ref="inputTime"
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    inputmode="none"
    @focus="focus()"
    @blur="blur"
  >
    <template #append>
      <q-icon name="access_time" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <template #default>
      <q-popup-proxy
        v-if="show"
        v-model="show"
        class="flex justify-center"
        transition-show="scale"
        transition-hide="scale"
        persistent
        no-parent-event
        no-refocus
        no-focus
      >
        <q-time v-model="observeValue" :with-seconds="withSeconds">
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-time>
      </q-popup-proxy>
    </template>
  </input-text>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: String },
    label: { type: String },
    placeholder: { type: String, default: '年/月/日' },
    withSeconds: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const inputTime = ref()
    const show = ref(false)
    const observeValue = useVModel(props, 'modelValue', emit)

    // methods
    const showPopup = (isShow) => {
      setTimeout(() => {
        show.value = isShow
      }, '200')
    }

    const focus = () => {
      showPopup(true)
    }

    const blur = (evt) => {
      // 判斷除了close按鈕和日期按鈕以外的按鈕繼續focus
      if (evt?.relatedTarget?.className.includes('q-time') ||
      evt?.relatedTarget?.className.includes('q-time--portrait')) {
        inputTime.value.focus()
      } else {
        showPopup(false)
      }
    }

    return {
      inputTime,
      show,
      observeValue,
      showPopup,
      focus,
      blur,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
