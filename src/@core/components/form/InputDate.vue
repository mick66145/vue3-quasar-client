<template>
  <input-text
    ref="inputData"
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
    :rules="ruleList"
    :required="required"
    inputmode="none"
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
        <q-date
          v-model="observeValue"
          :title="dateTitle"
          :subtitle="dateSubtitle"
          :options="observeOptions"
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
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'
import { useApp } from '@/stores/app'
export default defineComponent({
  props: {
    modelValue: { type: String },
    label: { type: String },
    placeholder: { type: String, default: '年/月/日' },
    options: { type: Array },
    min: { type: String },
    max: { type: String },
    rules: { type: Array, default () { return [] } },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const store = useApp()
    const inputData = ref()
    const show = ref(false)
    const { min, max, options, rules } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
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
    const ruleList = computed(() => {
      const rule = []
      min.value && rule.push(vuelidate.dayIsSameOrAfter(i18n.global.t('g.validation.day-is-same-or-after', { min: min.value })))
      max.value && rule.push(vuelidate.dayIsSameOrBefore(i18n.global.t('g.validation.day-is-same-or-before', { max: max.value })))
      return rule.concat(rules.value)
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

    return {
      inputData,
      show,
      observeValue,
      locale,
      dateTitle,
      dateSubtitle,
      observeOptions,
      ruleList,
      showPopup,
      updateModelValue,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
