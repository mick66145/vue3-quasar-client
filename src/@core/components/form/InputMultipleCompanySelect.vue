<template>
  <input-multiple-select
    v-model="observeValue"
    :label="label"
    :options="companyList"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { CompanyResource } from '@core/modules/company/api'
import useCRUD from '@/hooks/useCRUD'

const companyResource = CompanyResource({})

export default defineComponent({
  props: {
    modelValue: { type: Array, default () { return [] } },
    label: { type: String, default: '公司' },
    placeholder: { type: String, default: '請選擇公司' },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const companyList = ref([])

    // mounted
    onMounted(() => {
      callReadListFetch()
    })

    // methods
    const fetchData = async (query) => {
      return await companyResource.list({query}).then((res) => {
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
      companyList,
      fetchData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
