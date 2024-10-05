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
        <q-time
          v-model="observeValue"
          :with-seconds="withSeconds"
          :format24h="format24h"
          :hour-options="hourOptions"
          :minute-options="minuteOptions"
          :options="observeOptions"
        >
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-time>
      </q-popup-proxy>
    </template>
  </input-text>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: String },
    label: { type: String },
    placeholder: { type: String, default: '時:分' },
    withSeconds: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    format24h: { type: Boolean, default: false },
    hourOptions: { type: Array },
    minuteOptions: { type: Array },
    options: { type: Array },
    min: { type: String },
    max: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // ref
    const inputTime = ref()

    // data
    const { min, max, options } = toRefs(props)
    const show = ref(false)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const observeOptions = computed(() => {
      const _options = options.value
      const timeFn = (hour, minute) => {
        const _min = min.value ? convertTimeToMinutes(min.value) : null
        const _max = max.value ? convertTimeToMinutes(max.value) : null
        const timeInMinutes = hour * 60 + minute
        if (_min === null && _max === null) return true
        if (_min !== null && _max !== null) {
          return timeInMinutes >= _min && timeInMinutes <= _max
        }
        if (_min !== null) {
          if (timeInMinutes === Math.floor((_min / 60)) * 60) return true
          return timeInMinutes >= _min
        }
        if (_max !== null) {
          if (timeInMinutes === Math.floor((_max / 60)) * 60) return true
          return timeInMinutes <= _max
        }
        return true
      }
      if (_options && _options.length > 0) return _options
      return timeFn
    })

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
    const convertTimeToMinutes = (time) => {
      const [hour, minute] = time.split(':').map(Number)
      return hour * 60 + minute
    }

    return {
      inputTime,
      show,
      observeValue,
      observeOptions,
      showPopup,
      focus,
      blur,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
