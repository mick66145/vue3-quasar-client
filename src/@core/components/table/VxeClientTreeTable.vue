<template>
  <vxe-client-table
    ref="dataTable"
    :data="data"
    :total="total"
    :current="current"
    :show-pagination="showPagination"
    :show-footer="showFooter"
    :show-skeleton="showSkeleton"
    :footer-span-method="footerSpanMethod"
    :footer-method="footerMethod"
    :tree-config="treeConfig"
    :expand-config="expandConfig"
    :max-height="maxHeight"
    :header-cell-style="headerCellStyle"
    :cell-style="cellStyle"
    :footer-cell-style="footerCellStyle"
    :row-config="rowConfig"
    :checkbox-config="checkboxConfig"
    @checkbox-all="onCheckboxAll"
    @checkbox-change="onCheckboxChange"
    @update:current="onUpdateCurrent"
  >
    <slot />
  </vxe-client-table>
</template>

<script>
import { defineComponent, ref, computed } from 'vue-demi'
import { useApp } from '@/stores/app'
export default defineComponent({
  props: {
    data: { type: Array, default () { return [] } },
    total: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    showPagination: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    showSkeleton: { type: Boolean, default: true },
    footerSpanMethod: { type: Function },
    footerMethod: { type: Function },
    checkboxConfig: { type: Object }, // { labelField:'', checkMethod:({row}), visibleMethod:({row})}
    treeConfig: { type: Object, default () { return { transform: true, iconOpen: 'vxe-icon-minus', iconClose: 'vxe-icon-add' } } },
    expandConfig: { type: Object },
    rowConfig: { type: Object },
    maxHeight: { type: String },
    headerCellStyle: { type: [Object, Function] },
    cellStyle: { type: [Object, Function] },
    footerCellStyle: { type: [Object, Function] },
  },
  emits: ['checkbox-all', 'checkbox-change', 'update:current'],
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const dataTable = ref()
    const refreshKey = ref(0)

    // computed
    const isReadingList = computed(() => {
      return storeApp.isReadingList
    })

    // methods
    const refresh = () => {
      refreshKey.value++
    }
    const updateFooter = () => {
      dataTable.value.updateFooter()
    }

    // checkox相關methods
    const getCheckboxRecords = () => {
      return dataTable.value.getCheckboxRecords()
    }
    const setCheckboxRow = (rows, checked) => {
      return dataTable.value.setCheckboxRow(rows, checked)
    }
    const toggleCheckboxRow = (row) => {
      return dataTable.value.toggleCheckboxRow(row)
    }
    const setAllCheckboxRow = (checked) => {
      return dataTable.value.setAllCheckboxRow(checked)
    }
    const clearCheckboxRow = () => {
      return dataTable.value.clearCheckboxRow()
    }
    const getTableData = () => {
      return dataTable.value.getTableData()
    }
    const getFullData = () => {
      return getTableData().fullData
    }
    const insertAt = async (obj, row) => {
      await dataTable.value.insertAt(obj, row)
    }
    const insertAtLast = async (obj) => {
      insertAt(obj, -1)
    }
    const remove = (row) => {
      dataTable.value.remove(row)
    }
    const refreshColumn = () => {
      dataTable.value.refreshColumn()
    }
    const onCheckboxAll = ({ checked }) => {
      emit('checkbox-all', { checked })
    }
    const onCheckboxChange = ({ checked }) => {
      emit('checkbox-change', { checked })
    }
    const onUpdateCurrent = (current) => {
      emit('update:current', current)
    }

    return {
      dataTable,
      refreshKey,
      isReadingList,
      refresh,
      updateFooter,
      getCheckboxRecords,
      setCheckboxRow,
      toggleCheckboxRow,
      setAllCheckboxRow,
      clearCheckboxRow,
      getTableData,
      getFullData,
      insertAt,
      insertAtLast,
      remove,
      refreshColumn,
      onCheckboxAll,
      onCheckboxChange,
      onUpdateCurrent,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
