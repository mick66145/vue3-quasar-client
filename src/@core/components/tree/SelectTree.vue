<template>
  <base-tree
    ref="tree"
    v-model:selected="observeValue"
    :nodes="nodes"
    :selected-color="selectedColor"
    :default-expand-all="defaultExpandAll"
    :use-search="useSearch"
  />
</template>

<script>
import BaseTree from './BaseTree.vue'
import { defineComponent, ref } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  components: {
    BaseTree,
  },
  props: {
    modelValue: { type: [Array, Object, String, Number] },
    nodes: { type: Array, default () { return [] } },
    selectedColor: { type: String },
    defaultExpandAll: { type: Boolean, default: true },
    useSearch: { type: Boolean, default: true },
  },
  setup (props, { emit }) {
    // data
    const tree = ref()
    const observeValue = useVModel(props, 'modelValue', emit)

    // methods
    const expandAll = () => {
      tree.value.expandAll()
    }

    return {
      tree,
      observeValue,
      expandAll,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
