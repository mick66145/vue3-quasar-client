<template>
  <div class="row q-gutter-x-sm justify-center">
    <input-number
      v-for="i in length"
      v-bind="$attrs"
      :key="i"
      :ref="el => updateFieldRef(el, i - 1)"
      v-model="fieldValues[i - 1]"
      input-class="text-center"
      class="w-[6ch]"
      outlined
      placeholder=""
      :required="false"
      :clearable="false"
      :dense="false"
      :maxlength="1"
      :spinner="false"
      @keyup="onKeyUp($event, i - 1)"
      @update:modelValue="onUpdate($event, i - 1)"
    />
  </div>
</template>

<script>
import { defineComponent, computed, onBeforeUpdate, ref, watch, toRefs } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    length: { type: Number, default: 6 },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { length } = toRefs(props)
    const fields = ref([])
    const fieldValues = ref(Array.from({ length: length.value }, () => null))

    // computed
    const composite = computed(() => {
      const nonNullFields = fieldValues.value.filter(value => value !== null && value !== undefined)
      return (length.value === nonNullFields.length && nonNullFields.join('')) || ''
    })

    onBeforeUpdate(() => {
      fields.value = []
    })

    // methods
    const updateFieldRef = (element, index) => {
      element && (fields.value[index] = element)
    }
    const focus = (index) => {
      const shouldSelect = index >= 0 && index < length.value
      const shouldBlur = composite.value
      shouldSelect && fields.value[index].select()
      shouldBlur && fields.value[index - 1]?.blur()
    }
    const onUpdate = (value, index) => {
      (value !== null && value !== undefined) && focus(index + 1)
    }
    const onKeyUp = (evnt, index) => {
      const key = evnt.key
      const isNavigationKey = ['Tab', 'Shift', 'Meta', 'Control', 'Alt', 'Delete'].includes(key)

      if (!isNavigationKey) {
        const actions = {
          ArrowLeft: () => focus(index - 1),
          Backspace: () => focus(index - 1),
          ArrowRight: () => focus(index + 1),
        }
        actions[key]?.()
      }
    }
    const clear = () => {
      fieldValues.value = Array.from({ length: length.value }, () => null)
    }

    // watch
    watch(composite, () => {
      if (composite.value) {
        emit('update:modelValue', composite.value)
      }
    })

    return {
      composite,
      fields,
      fieldValues,
      focus,
      onKeyUp,
      onUpdate,
      updateFieldRef,
      clear,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
