<template>
  <base-form-item v-show="model.is_show" :label="observeLabel" :class="observeClass">
    <component
      v-bind="model"
      :is="model.component"
      :label="observeLabel"
      :placeholder="observePlaceholder"
      :model-value="modelValue"
      @update:modelValue="handleChange"
    />
  </base-form-item>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    model: { type: Object, required: true, default: () => ({}) },
    store: { type: Object },
  },
  setup (props) {
    // data
    const { model, store: storeForm } = toRefs(props)
    const { data_key, layout, label, placeholder, i18n_key } = model.value

    // computed
    const modelValue = computed(() => {
      return storeForm.value.getFieldValue(data_key)
    })
    const observeClass = computed(() => {
      const { xs, sm, md, lg, xl, '2xl': xxl } = layout
      const classObj = {
        [`col-xs-${xs}`]: xs !== undefined,
        [`col-sm-${sm}`]: sm !== undefined,
        [`col-md-${md}`]: md !== undefined,
        [`col-lg-${lg}`]: lg !== undefined,
        [`col-xl-${xl}`]: xl !== undefined,
        [`col-2xl-${xxl}`]: xxl !== undefined,
      }
      return classObj
    })
    const observeLabel = computed(() => {
      return i18n_key ? i18n.global.t(i18n_key) : label
    })
    const observePlaceholder = computed(() => {
      return i18n_key ? i18n.global.t('g.common.input', { field: i18n.global.t(i18n_key) }) : placeholder
    })

    const handleChange = (value) => {
      storeForm.value.updateFieldValue(data_key, value)
    }

    return {
      modelValue,
      observeClass,
      observeLabel,
      observePlaceholder,
      handleChange,
    }
  },
})
</script>
