<template>
  <vxe-column
    :field="field"
    :title="title"
    :sortable="sortable"
    :width="width"
    :min-width="minWidth"
  >
    <template #default="{ row }">
      <base-icon :name="getValueByPath(row,field)" :size="size" :color="color" />
    </template>
  </vxe-column>
</template>
<script>

import { defineComponent } from 'vue-demi'
import { getValueByPath } from '@/utils'

export default defineComponent({
  props: {
    field: { type: String },
    title: { type: String },
    sortable: { type: Boolean, default: false },
    width: { type: [Number, String] },
    minWidth: { type: [Number, String] },
    size: { type: String },
    color: { type: String },
  },
  setup () {
    return {
      getValueByPath,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
