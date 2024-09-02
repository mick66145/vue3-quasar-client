<template>
  <div class="flex items-center justify-left">
    <span class="q-mr-sm">
      {{ $t('g.pagination.item-count', { total }) }}
    </span>
    <span v-if="showPageSize">
      <input-select
        v-model="pageSize"
        class="w-[95px] pagination-select"
        dense
        emit-value
        option-label="label"
        option-value="value"
        :clearable="false"
        :options="pageSizeOptions"
        @update:modelValue="changePageSize"
      />
    </span>
    <q-pagination
      v-model="observeCurrent"
      boundary-links
      :max="maxSize"
      :max-pages="4"
      :boundary-numbers="false"
      icon-first="keyboard_double_arrow_left"
      icon-last="keyboard_double_arrow_right"
      @update:modelValue="handleCurrentChange"
    />
    <div>
      <span>{{ $t('g.pagination.go-to') }}</span>
      <input-text
        v-model.lazy="toPage"
        class="w-[55px] pagination-input"
        dense
        :clearable="false"
        @change="changeToPage"
        @keyup.enter="changeToPage"
      />
      <span>{{ $t('g.pagination.page') }}</span>
    </div>
  </div>
</template>
<script>
import { scrollTo } from '@/utils/scroll-to'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, computed, watch } from 'vue-demi'

export default defineComponent({
  props: {
    current: { type: Number, default: 1 },
    limit: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    autoScroll: { type: Boolean, default: true },
    showPageSize: { type: Boolean, default: false },
  },
  emits: ['update:current', 'update:pageSize'],
  setup (props, { emit }) {
    // data
    const toPage = ref(props.current)
    const observeCurrent = useVModel(props, 'current', emit)
    const pageSize = ref(props.limit)
    const pageSizeOptions = ref([
      { label: '10 / 頁', value: 10 },
      { label: '25 / 頁', value: 25 },
      { label: '50 / 頁', value: 50 },
    ])

    // computed
    const maxSize = computed(() => {
      const total = +props.total
      const limit = +pageSize.value
      return Math.ceil(+(total / limit))
    })

    // methods
    const changeToPage = () => {
      toPage.value = +toPage.value
      const val = toPage.value
      const maxSizeVal = maxSize.value
      const r = /^\+?[1-9][0-9]*$/
      if (!r.test(val)) {
        toPage.value = 1
      } else if (r.test(val) && val >= maxSizeVal) {
        toPage.value = maxSizeVal
      }
      emit('update:current', toPage.value)
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }
    const handleCurrentChange = (val) => {
      toPage.value = val
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }
    const changePageSize = () => {
      emit('update:pageSize', pageSize.value)
    }

    // watch
    watch(() => props.current, (newValue) => {
      toPage.value = newValue
    })
    watch(() => props.limit, (newValue) => {
      pageSize.value = newValue
    })

    return {
      toPage,
      observeCurrent,
      maxSize,
      pageSize,
      pageSizeOptions,
      changeToPage,
      changePageSize,
      handleCurrentChange,
    }
  },
})

</script>

<style lang="postcss" scoped>
.pagination-input,
.pagination-select {
  @apply my-0 mx-[3px];
  @apply inline-block;
  :deep(.q-field__inner) {
    @apply h-[32px];
    .q-field__control {
      @apply h-[32px] min-h-[0px];
    }
  }
}
:deep {
  .q-btn--flat.q-btn--rectangle {
    min-width: 2rem !important;
  }
  .q-btn--standard.q-btn--rectangle {
    min-width: 2rem !important;
  }
}
</style>
