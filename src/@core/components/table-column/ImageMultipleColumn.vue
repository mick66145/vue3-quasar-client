<template>
  <vxe-column
    :field="field"
    :title="title"
    :sortable="sortable"
    :width="width"
  >
    <template #default="{ row }">
      <base-image
        v-for="(imageItem, imageIndex) in getValueByPath(row,field)"
        :key="imageIndex"
        class="q-mr-sm q-mb-sm"
        :src="getValueByPath(imageItem,imageField)"
        :width="imageWidth"
        :height="imageHeight"
        :use-authorization="useAuthorization"
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
    imageField: { type: String },
    title: { type: String },
    sortable: { type: Boolean, default: false },
    width: { type: [Number, String], default: 200 },
    imageWidth: { type: String },
    imageHeight: { type: String },
    useAuthorization: { type: Boolean, default: false },
  },
  setup () {
    return {
      getValueByPath,
    }
  },
})
</script>
<style lang="postcss" scoped>
</style>
