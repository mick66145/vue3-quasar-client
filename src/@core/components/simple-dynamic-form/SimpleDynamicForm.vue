<template>
  <div class="row q-col-gutter-md">
    <simple-form :models="models" :store="observeStore" />
  </div>
</template>

<script>
import SimpleForm from './components/SimpleForm.vue'
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useFormStore } from './stores/form'

export default defineComponent({
  components: {
    SimpleForm,
  },
  props: {
    id: { type: String, default: 'simpleDynamicForm' },
    models: { type: Array, default () { return [] } },
    store: { type: Object },
  },
  emits: [],
  setup (props) {
    // data
    const { store } = toRefs(props)

    // computed
    const observeStore = computed(() => {
      return store.value ? store.value : useFormStore(props.id)
    })

    // methods
    const getFormModels = () => {
      return observeStore.value.getFormModels()
    }
    const getFormData = () => {
      return observeStore.value.getFormData()
    }

    return {
      observeStore,
      getFormModels,
      getFormData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
