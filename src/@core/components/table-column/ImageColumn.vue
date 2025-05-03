<template>
  <vxe-column
    :field="field"
    :title="title"
    :sortable="sortable"
    :width="width"
    :min-width="minWidth"
  >
    <template #default="{ row }">
      <base-image
        :src="getValueByPath(row,field)"
        :use-authorization="useAuthorization"
        :ratio="ratio"
      />
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
    useAuthorization: { type: Boolean, default: false },
    ratio: { type: Number, default: 1 },
  },
  setup () {
    return {
      getValueByPath,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
