<template>
  <q-field
    v-model="observeValue"
    class="h-full full-width pb-0"
    :rules="ruleList"
    borderless
  >
    <template #control>
      <div class="pt-2.5">
        <label v-if="showLabel">{{ label }}</label>
        <q-option-group
          v-model="observeValue"
          :options="options"
          :color="color"
          :inline="inline"
          :type="type"
          :disable="disable"
          :dense="dense"
        >
          <template v-if="$slots.label" #label="opt">
            <slot name="label" :opt="opt" />
          </template>
        </q-option-group>
      </div>
    </template>
  </q-field>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null, Object, Boolean] },
    options: { type: Array, default () { return [] } },
    label: { type: String },
    inline: { type: Boolean, default: true },
    color: { type: String, default: 'primary' },
    type: { type: String },
    disable: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: false },
    dense: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    rules: { type: Array, default () { return [] } },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const { label, rules, required } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const ruleList = computed(() => {
      const rule = []
      required.value && rule.push(vuelidate.required(i18n.global.t('g.validation.required', { attribute: label.value })))
      return rule.concat(rules.value)
    })

    return {
      observeValue,
      ruleList,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-field {
  :deep() {
    .q-field__bottom {
      @apply pt-0 px-3;
    }
    .q-field__native {
      @apply pb-0 ;
    }
  }
}

</style>
