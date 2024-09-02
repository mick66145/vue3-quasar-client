
<template>
  <q-list v-for="(option,index) in options" :key="option">
    <sidebar-link
      v-if="!option.children || option?.children.length===0"
      :to="option.to"
      :title="option.title"
      :icon="option.icon"
      :clickFn="option.clickFn"
    />
    <q-expansion-item
      v-else
      :content-inset-level="0.5"
      :label="option.title"
    >
      <sidebar-list :options="option.children" />
    </q-expansion-item>
    <q-separator v-if="index !== options.length-1" />
  </q-list>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    SidebarLink,
  },
  props: {
    options: { type: Array, default () { return [] } },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
