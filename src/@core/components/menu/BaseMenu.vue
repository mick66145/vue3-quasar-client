<template>
  <q-menu
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
  >
    <menu-list :options="options" />
  </q-menu>
</template>

<script>
import MenuList from './components/MenuList.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    MenuList,
  },
  props: {
    transitionShow: { type: String, default: 'scale' },
    transitionHide: { type: String, default: 'scale' },
    options: { type: Array, default () { return [] } },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
