<template>
  <input-text
    ref="inputDateRange"
    :label="label"
    :placeholder="observePlaceholder"
    :modelValue="observeValue"
    :required="required"
    inputmode="none"
    @clear="clearFn"
  >
    <template #append>
      <q-icon name="event" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <template #default>
      <q-popup-proxy
        v-model="show"
        class="flex justify-center"
        transition-show="scale"
        transition-hide="scale"
      >
        <!-- <div style="width: 100px;">
        <div class="q-mt-md">
          <q-btn
            v-for="({ text,onClick }, index) in pickerOptions.shortcuts"
            :key="index"
            style="width: 100px;"
            flat
            :label="text"
            @click="onClick"
          />
        </div>
      </div> -->
        <q-date
          ref="datePicker"
          v-model="dateRangeValue"
          range
          :title="dateTitle"
          :subtitle="dateSubtitle"
          :options="options"
          :locale="locale"
          @update:modelValue="updateModelValue"
        >
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </template>
  </input-text>
</template>

<script>
import { $dayjs } from '@/plugins/dayjs'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import { useApp } from '@/stores/app'
export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    label: { type: String },
    placeholder: { type: String },
    options: { type: Array },
    min: { type: String },
    max: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data

    const store = useApp()
    const inputDateRange = ref()
    const datePicker = ref()
    const show = ref(false)
    const { min, max, placeholder, options } = toRefs(props)
    const pickerOptions = {
      shortcuts: [
        {
          text: '今天',
          onClick () {
            const start = $dayjs().format('YYYY-MM-DD')
            const end = $dayjs().format('YYYY-MM-DD')
            datePicker.value.setEditingRange(start, end)
          },
        },
        {
          text: '前七天',
          onClick () {
            let start = new Date()
            const end = $dayjs()
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 7,
            )
            start = $dayjs(start)
            const startObj = {
              year: start.year(),
              month: start.month() + 1,
              day: start.date(),
            }
            const endObj = {
              year: end.year(),
              month: end.month() + 1,
              day: end.date(),
            }
            datePicker.value.setEditingRange({ from: startObj, to: endObj })
          },
        },
        {
          text: '前三十天',
          onClick () {
            const start = new Date()
            const end = $dayjs().format('YYYY-MM-DD')
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 30,
            )
            observeValue.value = { from: $dayjs(start).format('YYYY-MM-DD'), to: end }
          },
        },
        {
          text: '前一年',
          onClick () {
            const start = new Date()
            const end = $dayjs().format('YYYY-MM-DD')
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 365,
            )
            observeValue.value = { from: $dayjs(start).format('YYYY-MM-DD'), to: end }
          },
        },
      ],
    }

    // computed
    const observeValue = computed(() => {
      return props.modelValue ? `${props.modelValue?.from} - ${props.modelValue?.to}` : ''
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.date-range') })
    })
    const dateRangeValue = computed({
      get () {
        return props.modelValue?.from === props.modelValue?.to ? props.modelValue?.from : props.modelValue
      },
      set (value) {
        const dateRangeValuePrototype = Object.prototype.toString.call(value)
        if (dateRangeValuePrototype === '[object String]') {
          emit('update:modelValue', { from: value, to: value })
        } else {
          emit('update:modelValue', value)
        }
      },
    })
    const locale = computed(() => {
      const message = i18n.global.messages[store.language]
      return {
        days: message.date.days,
        daysShort: message.date.daysShort,
        months: message.date.months,
        monthsShort: message.date.monthsShort,
        firstDayOfWeek: message.date.firstDayOfWeek,
      }
    })
    const dateTitle = computed(() => {
      return !observeValue.value ? ' ' : ''
    })
    const dateSubtitle = computed(() => {
      return !observeValue.value ? ' ' : ''
    })
    const observeOptions = computed(() => {
      const _options = options.value
      const dateFn = (date) => {
        const _min = min.value
        const _max = max.value
        if (!_min && !_max) return true
        if (_min && _max) return date >= _min && date <= _max
        if (_min) return date >= _min
        if (_max) return date <= _max
      }
      if (_options && _options.length > 0) return _options
      return dateFn
    })

    // methods
    const showPopup = (isShow) => {
      setTimeout(() => {
        show.value = isShow
      }, '200')
    }
    const updateModelValue = (value, reason, details) => {
      if (value) showPopup(false)
    }
    const clearFn = (val) => {
      dateRangeValue.value = null
    }

    return {
      inputDateRange,
      datePicker,
      show,
      observeValue,
      observePlaceholder,
      dateRangeValue,
      pickerOptions,
      locale,
      dateTitle,
      dateSubtitle,
      observeOptions,
      clearFn,
      showPopup,
      updateModelValue,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
