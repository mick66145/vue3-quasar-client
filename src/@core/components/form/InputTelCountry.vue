<template>
  <input-tel
    v-model="observeValue.phone"
    :label="observeLabel"
    :placeholder="observePlaceholder"
    :outlined="false"
    :show-label="false"
    :required="required"
  >
    <template #before>
      <input-select
        v-model="observeValue.phone_country"
        class="w-5rem"
        :outlined="false"
        :options="countryCodeList"
        :clearable="false"
        emit-value
        option-label="country_phone_code"
        option-value="country_code"
      >
        <template #option="scope">
          <q-item v-bind="scope.scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.scope.opt.country_icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.scope.opt.country_name }}</q-item-label>
              <q-item-label caption>{{ scope.scope.opt.country_phone_code }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </input-select>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.counter" #counter>
      <slot name="counter" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </input-tel>
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { CountryCodeResource } from '@core/modules/country-code/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const countryCodeResource = CountryCodeResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const countryCodeList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.phone')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.input', { field: i18n.global.t('g.common.phone') })
    })

    // mounted
    onMounted(() => {
      callReadListFetch()
    })

    // methods
    const fetchData = async (query) => {
      return await countryCodeResource.list({ query }).then((res) => {
        countryCodeList.value = []
        countryCodeList.value = res.list
      })
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      countryCodeList,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
