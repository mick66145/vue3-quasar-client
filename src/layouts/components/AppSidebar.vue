<template>
  <q-drawer
    v-model="sidebarOpened"
    side="right"
    show-if-above
    bordered
    :width="260"
    class="shadow-7 text-blue-grey-7"
  >
    <q-scroll-area class="h-full">
      <sidebar-list
        :options="sidearOptions"
      />
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import SidebarList from './sidebar/SidebarList.vue'
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'

export default defineComponent({
  components: {
    SidebarList,
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    // data
    const store = useApp()

    // computed
    const sidebarOpened = computed({
      get () {
        return store.sidebar.opened
      },
      set () {
        store.toggleSideBar()
      },
    })
    const sidearOptions = computed(() => {
      return []
    })

    return {
      sidebarOpened,
      sidearOptions,
    }
  },
})
</script>

<style lang="postcss" scoped>
:deep(.q-expansion-item__content) {
  @apply bg-gray-50;
}
</style>
