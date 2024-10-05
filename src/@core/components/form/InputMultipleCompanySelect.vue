<template>
  <input-multiple-select
    v-model="observeValue"
    :label="observeLabel"
    :options="companyList"
    :placeholder="observePlaceholder"
    :required="required"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { CompanyResource } from '@core/modules/company/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const companyResource = CompanyResource({})

export default defineComponent({
  props: {
    modelValue: { type: Array, default () { return [] } },
    label: { type: String },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const companyList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('company.form.name')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('company.form.name') })
    })

    // mounted
    onMounted(() => {
      callReadListFetch()
    })

    // methods
    const fetchData = async (query) => {
      return await companyResource.list({ query }).then((res) => {
        companyList.value = []
        companyList.value = res.list
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
      companyList,
      fetchData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
