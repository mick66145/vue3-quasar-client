<template>
  <input-text
    ref="inputMonth"
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    inputmode="none"
    @focus="focus()"
    @blur="blur"
  >
    <template #append>
      <q-icon name="event" />
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
        <month-picker
          v-model="observeValue"
          :color="color"
          :locale="locale"
          :min="min"
          :max="max"
        >
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </month-picker>
      </q-popup-proxy>
    </template>
  </input-text>
</template>

<script>
import MonthPicker from './components/MonthPicker.vue'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  components: {
    MonthPicker,
  },
  props: {
    modelValue: { type: [String, Number, Date, null] },
    label: { type: String },
    placeholder: { type: String, default: '年-月' },
    color: { type: String, default: 'primary' },
    locale: { type: String },
    min: { type: String },
    max: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const inputMonth = ref()
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
      if (evt?.relatedTarget.className.includes('q-date') ||
      evt?.relatedTarget?.className.includes('q-btn--no-uppercase') ||
      evt?.relatedTarget.className.includes('q-focus-helper') ||
      evt?.relatedTarget.className.includes('q-btn--round')
      ) {
        inputMonth.value.focus()
      } else {
        showPopup(false)
      }
    }

    return {
      inputMonth,
      observeValue,
      show,
      showPopup,
      focus,
      blur,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
