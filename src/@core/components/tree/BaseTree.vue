<template>
  <div class="q-gutter-sm">
    <input-search v-show="useSearch" v-model="search" dense />
    <q-tree
      ref="tree"
      v-model:ticked="observeValue"
      v-model:selected="observeSelected"
      v-model:expanded="expanded"
      :nodes="nodes"
      :node-key="nodeKey"
      :label-key="labelKey"
      :selected-color="selectedColor"
      :default-expand-all="defaultExpandAll"
      :tick-strategy="tickStrategy"
      :filter="search"
      :filter-method="filterFn"
      no-results-label="無此結果"
      no-nodes-label="暫無資料"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: { type: [Array, Object, String, Number] },
    selected: { type: [Array, Object, String, Number] },
    nodes: { type: Array, default () { return [] } },
    nodeKey: { type: String, default: 'id' },
    labelKey: { type: String, default: 'name' },
    selectedColor: { type: String, default: 'primary' },
    defaultExpandAll: { type: Boolean, default: true },
    useSearch: { type: Boolean, default: true },
    tickStrategy: { type: String },
  },
  emits: ['update:modelValue', 'update:selected'],
  setup (props, { emit }) {
    // data
    const tree = ref()
    const search = ref()
    const expanded = ref([])

    // computed
    const observeValue = computed({
      get () { return props.modelValue },
      set (value) { emit('update:modelValue', value) },
    })
    const observeSelected = computed({
      get () { return props.selected },
      set (value) { emit('update:selected', value) },
    })

    // methods
    const expandAll = () => {
      tree.value.expandAll()
    }
    const filterFn = (node, val) => {
      const needle = val.toLowerCase()
      return node[props.labelKey] && node[props.labelKey].toLowerCase().indexOf(needle) > -1
    }

    return {
      tree,
      observeValue,
      observeSelected,
      search,
      expanded,
      expandAll,
      filterFn,
    }
  },
})
</script>

<style lang="postcss" scoped>
  :deep(.q-tree__node-header) {
    @apply rounded-full bg-slate-100 px-2;
  }

</style>
