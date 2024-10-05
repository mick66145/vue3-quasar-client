<template>
  <input-search
    v-model="searchValue"
    class="full-width"
    :label="label"
    :placeholder="placeholder"
    @change="search"
  >
    <q-menu
      ref="menu"
      fit
      no-parent-event
      :max-height="maxHeight"
    >
      <q-list class="min-w-4rem w-full">
        <q-item
          v-for="(optionItem, optionIndex) in options"
          :key="optionIndex"
          v-close-popup
          clickable
          @click="select(optionItem)"
        >
          <q-item-section>{{ optionLabelFn(optionItem) }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template #append>
      <q-icon name="search" />
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>

    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>

    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>

    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <template v-if="$slots.counter" #counter>
      <slot name="counter" />
    </template>

    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </input-search>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null, Object] },
    label: { type: String },
    placeholder: { type: String },
    emitValue: { type: Boolean, default: false },
    transitionShow: { type: String, default: 'scale' },
    transitionHide: { type: String, default: 'scale' },
    optionLabel: { type: String, default: 'name' },
    optionValue: { type: String, default: 'id' },
    maxHeight: { type: String, default: '300px' },
    filterFetch: { type: Function },
    filterQuery: { type: [String, null, Object] },
    filterKey: { type: [Array], default: ['keyword'] },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const menu = ref()
    const { filterFetch, filterQuery, filterKey } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const options = ref([])

    // computed
    const searchValue = computed({
      get () {
        return observeValue.value ? optionValueFn(observeValue.value) : null
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })

    // methods
    const filterFn = async () => {
      if (filterFetch.value) {
        const keyObj = filterKey.value.reduce((obj, element) => {
          obj[element] = observeValue.value
          return obj
        }, {})
        const query = { ...filterQuery.value, ...keyObj }
        const [res] = await callReadListFetch(query)
        if (res.list.length > 0) {
          options.value = []
          options.value = res.list
          menu.value.show()
        }
      }
    }
    const optionValueFn = (item) => {
      return (item[props.optionValue] !== undefined || null) ? item[props.optionValue] : item
    }
    const optionLabelFn = (item) => {
      return (item[props.optionLabel] !== undefined || null) ? item[props.optionLabel] : item
    }
    const search = () => filterFn()
    const select = (item) => emit('update:modelValue', item)

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: filterFetch.value,
    })

    return {
      menu,
      observeValue,
      searchValue,
      options,
      search,
      select,
      optionLabelFn,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
