<template>
  <simple-form-item v-for="item in models" :key="item.id" :model="item" :store="storeForm" />
</template>

<script>
import SimpleFormItem from './SimpleFormItem.vue'
import { defineComponent, toRefs } from 'vue-demi'

export default defineComponent({
  components: {
    SimpleFormItem,
  },
  props: {
    models: { type: Array, default () { return [] } },
    store: { type: Object },
  },
  setup (props) {
    // data
    const { store: storeForm } = toRefs(props)

    return {
      storeForm,
    }
  },
})
</script>
