<template>
  <div>
    <div v-show="!isReading">
      <div v-if="showAllSelectBlock" class="flex items-center q-mb-sm">
        <!-- <q-checkbox
          v-model="allSelectd"
          :label="`選取(${allCheckboxRecordsCount})`"
          @update:modelValue="onSelect"
        /> -->
        已選取 : {{ allCheckboxRecordsCount }}
        <base-flat-button
          label="全選"
          @click="onSelectAll"
        />
        <base-flat-button
          color="red"
          label="清除"
          @click="clearAllCheckboxRow"
        />
      </div>
      <vxe-table
        ref="dataTable"
        :key="refreshKey"
        class="q-mb-sm"
        auto-resize
        round
        stripe
        :row-config="observeRowConfig"
        :data="data"
        :max-height="maxHeight"
        :sort-config="{ trigger: 'cell', remote: true }"
        :show-footer="showFooter"
        :footer-span-method="footerSpanMethod"
        :footer-method="footerMethod"
        :checkbox-config="observeCheckboxConfig"
        :tree-config="treeConfig"
        :expand-config="expandConfig"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :footer-cell-style="footerCellStyle"
        @sort-change="onChangeSort"
        @checkbox-all="onCheckboxAll"
        @checkbox-change="onCheckboxChange"
        @cell-click="onCellClick"
        @row-dragstart="onRowDragStart"
        @row-dragend="onRowDragend"
        @toggle-row-expand="onToggleRowExpand"
      >
        <slot />
      </vxe-table>
      <pagination
        v-if="total > 0 && showPagination"
        :total="total"
        :current="current"
        :limit="limit"
        :auto-scroll="false"
        @update:current="onUpdateCurrent"
      />
    </div>
    <skeleton-table v-if="isReading && showSkeleton" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue-demi'
import mapKeys from 'lodash-es/mapKeys'
export default defineComponent({
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
    },
    total: { type: Number, default: 0 },
    limit: { type: Number, default: 10 },
    current: { type: Number, default: 1 },
    showPagination: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    showSkeleton: { type: Boolean, default: true },
    showAllSelectBlock: { type: Boolean, default: false },
    footerSpanMethod: { type: Function },
    footerMethod: { type: Function },
    checkboxConfig: { type: Object }, // { labelField:'', checkMethod:({row}), visibleMethod:({row})}
    treeConfig: { type: Object },
    expandConfig: { type: Object },
    rowConfig: { type: Object },
    maxHeight: { type: Number },
    headerCellStyle: { type: [Object, Function] },
    cellStyle: { type: [Object, Function] },
    footerCellStyle: { type: [Object, Function] },
    isReading: { type: Boolean, default: false },
  },
  emits: ['sort-change', 'checkbox-all', 'checkbox-change', 'update:current', 'select-all', 'update:all-checkbox-records', 'cell-click', 'row-dragstart', 'row-dragend', 'toggle-row-expand'],
  setup (props, { emit }) {
    // data
    const dataTable = ref()
    const refreshKey = ref(0)
    const allSelectd = ref(false)

    // computed
    const observeCheckboxConfig = computed(() => {
      const config = {
        reserve: true,
        trigger: 'row',
      }
      mapKeys(props.checkboxConfig, (_, key) => {
        config[key] = props.checkboxConfig[key]
      })
      return config
    })
    const observeRowConfig = computed(() => {
      const config = {
        keyField: 'hashKey',
        isHover: true,
      }
      mapKeys(props.rowConfig, (_, key) => {
        config[key] = props.rowConfig[key]
      })
      return config
    })
    const allCheckboxRecordsCount = computed(() => {
      dataTable.value && onUpdateAllCheckboxRecords()
      return dataTable.value ? getAllCheckboxRecordsCount() : 0
    })

    // methods
    const sort = (item) => {
      dataTable.value.sort(item)
    }
    const refresh = () => {
      refreshKey.value++
    }
    const updateFooter = () => {
      dataTable.value.updateFooter()
    }
    const getCheckboxRecords = () => {
      return dataTable.value.getCheckboxRecords()
    }
    const getCheckboxRecordsCount = () => {
      return getCheckboxRecords().length
    }
    const getCheckboxReserveRecords = () => {
      return dataTable.value.getCheckboxReserveRecords()
    }
    const getAllCheckboxRecords = () => {
      return dataTable.value
        .getCheckboxReserveRecords()
        .concat(dataTable.value.getCheckboxRecords())
    }
    const getAllCheckboxRecordsCount = () => {
      return getAllCheckboxRecords().length
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
    const setAllRowExpand = (checked) => {
      return dataTable.value.setAllRowExpand(checked)
    }
    const clearCheckboxRow = () => {
      dataTable.value.clearCheckboxRow()
    }
    const clearCheckboxReserve = () => {
      dataTable.value.clearCheckboxReserve()
    }
    const clearAllCheckboxRow = () => {
      dataTable.value.clearCheckboxRow()
      dataTable.value.clearCheckboxReserve()
    }
    const getTableData = () => {
      return dataTable.value.getTableData()
    }
    const getFullData = () => {
      return getTableData().fullData
    }
    const getFullDataCount = () => {
      return getTableData().fullData.length
    }
    const insert = async (obj) => {
      await dataTable.value.insert(obj)
    }
    const insertAt = async (obj, row) => {
      await dataTable.value.insertAt(obj, row)
    }
    const insertAtLast = async (obj) => {
      insertAt(obj, -1)
    }
    const updateRow = (obj, row) => {
      const fullData = getFullData()
      dataTable.value.setRow(fullData[row], obj)
    }
    const remove = (row) => {
      dataTable.value.remove(row)
    }
    const refreshColumn = () => {
      dataTable.value.refreshColumn()
    }
    const onChangeSort = ({
      column,
      property,
      order,
      sortBy,
      sortList,
      $event,
    }) => {
      emit('sort-change', {
        column,
        property,
        order,
        sortBy,
        sortList,
        $event,
      })
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
    const onUpdateAllCheckboxRecords = () => {
      const value = {
        data: getAllCheckboxRecords(),
        count: getAllCheckboxRecordsCount(),
      }
      emit('update:all-checkbox-records', value)
    }
    const onRowDragStart = ({ row, column }) => {
      emit('row-dragstart', { row, column })
    }
    const onRowDragend = ({ newRow, oldRow, dragToChild }) => {
      emit('row-dragend', { newRow, oldRow, dragToChild })
    }
    const onSelectAll = () => {
      emit('select-all')
    }
    const onCellClick = ({ row, rowIndex }) => {
      emit('cell-click', { row, rowIndex })
    }
    const onToggleRowExpand = ({ expanded, row, rowIndex }) => {
      emit('toggle-row-expand', { expanded, row, rowIndex })
    }

    // 客製化選取checkbbox相關
    const onSelect = (value, evt) => {
      value ? setAllCheckboxRow(true) : clearCheckboxRow()
      setAllSelectdValue()
    }
    const setAllSelectdValue = () => {
      const checkboxRecordsLength = getCheckboxRecordsCount()
      const fullDataLength = getFullDataCount()
      allSelectd.value = checkboxRecordsLength === 0 ? false : (checkboxRecordsLength === fullDataLength ? true : null)
    }

    // watch
    // watch(() => props.data, (newValue) => {
    //   setAllSelectdValue()
    // })

    return {
      dataTable,
      refreshKey,
      allSelectd,
      observeCheckboxConfig,
      observeRowConfig,
      allCheckboxRecordsCount,
      sort,
      refresh,
      updateFooter,
      getCheckboxRecords,
      getCheckboxReserveRecords,
      getAllCheckboxRecords,
      setCheckboxRow,
      setAllRowExpand,
      toggleCheckboxRow,
      setAllCheckboxRow,
      clearCheckboxRow,
      clearCheckboxReserve,
      clearAllCheckboxRow,
      getTableData,
      getFullData,
      getAllCheckboxRecordsCount,
      insert,
      insertAt,
      insertAtLast,
      updateRow,
      remove,
      refreshColumn,
      onChangeSort,
      onCheckboxAll,
      onCheckboxChange,
      onUpdateCurrent,
      onSelectAll,
      onCellClick,
      onToggleRowExpand,
      onRowDragStart,
      onRowDragend,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
