<template>
  <label v-if="showLabel">{{ label }}<span v-if="required" class="text-xl text-negative ml-1">*</span></label>
  <div class="row q-col-gutter-sm">
    <div v-if="showCity" :class="observeCityCol">
      <input-city-select
        ref="inputCity"
        v-model="observeValue.city"
        class="full-width"
        :required="required"
        @update:modelValue="onChange('city')"
      />
    </div>
    <div v-if="showArea" :class="observeAreaCol">
      <input-area-select
        ref="inputArea"
        v-model="observeValue.area"
        class="full-width"
        :required="required"
        :city-id="observeValue.city?.id"
        @update:modelValue="onChange('area')"
      />
    </div>
    <div v-if="showPostCode && postCodeType ==='text'" :class="postCodeCol">
      <input-text
        v-model="observeValue.post_code"
        class="full-width"
        readonly
        placeholder="郵遞區號"
      />
    </div>
    <div v-if="showAddress" :class="addressCol">
      <input-text
        v-model="observeValue.address"
        class="full-width"
        :required="required"
        :prefix=" (showPostCode && postCodeType ==='prefix') ? observeValue.post_code :''"
        :hint="hint"
        :label="`${$t('g.common.address')}`"
        :placeholder="`${$t('g.common.input', { field: $t('g.common.address')})}`"
      />
    </div>
    <slot name="default" />
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: Object },
    label: { type: String, default: '地址' },
    required: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: false },
    cityCol: { type: String },
    areaCol: { type: String },
    postCodeCol: { type: String, default: 'col-4' },
    addressCol: { type: String, default: 'col-12' },
    showCity: { type: Boolean, default: true },
    showArea: { type: Boolean, default: true },
    showAddress: { type: Boolean, default: true },
    showPostCode: { type: Boolean, default: false },
    postCodeType: { type: String, default: 'prefix' },
    hint: { type: String },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const inputCity = ref()
    const inputArea = ref()
    const { cityCol, areaCol, postCodeType } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const observeCityCol = computed(() => {
      return cityCol.value ? cityCol.value : (postCodeType.value === 'prefix' ? 'col-6' : 'col-4')
    })
    const observeAreaCol = computed(() => {
      return areaCol.value ? areaCol.value : (postCodeType.value === 'prefix' ? 'col-6' : 'col-4')
    })

    // methods
    const onChange = async (action) => {
      switch (action) {
      case 'city':
        observeValue.value.area = null
        observeValue.value.post_code = null
        if (!observeValue.value.city) {
          inputArea.value.clearData()
        }
        break
      case 'area':
        observeValue.value.post_code = null
        if (observeValue.value.area) {
          observeValue.value.post_code = observeValue.value.area.detail.post_code
        }
        break
      }
    }

    return {
      inputCity,
      inputArea,
      observeValue,
      observeCityCol,
      observeAreaCol,
      onChange,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
