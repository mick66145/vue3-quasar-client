<template>
  <vxe-column :field="field" :title="title" :sortable="sortable" :min-width="minWidth">
    <template #default="{ row }">
      <base-chip :color="color" :text-color="textColor" :label="getValueByPath(row, field)" />
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
    minWidth: { type: [Number, String], default: 120 },
    color: { type: String },
    textColor: { type: String },
    icon: { type: String },
    size: { type: String, default: 'lg' },
  },
  setup () {
    return {
      getValueByPath,
    }
  },
})
</script>
<style lang="postcss" scoped></style>
