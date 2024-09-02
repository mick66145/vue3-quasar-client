<template>
  <q-list v-for="option in options" :key="option">
    <template v-if="option.children.length === 0">
      <menu-link
        v-if="!option.useHref"
        :to="option.to"
        :title="option.title"
        :icon="option.icon"
        :active="active(option.to)"
      />
      <menu-link
        v-else
        :href="option.to"
        :target="option.target"
        :title="option.title"
        :icon="option.icon"
      />
    </template>
    <q-item v-else v-ripple clickable>
      <q-item-section>{{ option.title }}</q-item-section>
      <q-item-section side>
        <q-icon name="keyboard_arrow_right" />
      </q-item-section>
      <q-menu anchor="top end" self="top start">
        <menu-list :options="option.children" />
      </q-menu>
    </q-item>
  </q-list>
</template>

<script>
import MenuLink from './MenuLink.vue'
import { defineComponent, computed } from 'vue-demi'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    MenuLink,
  },
  props: {
    options: { type: Array, default () { return [] } },
  },
  setup () {
    const route = useRoute()

    // computed
    const active = computed(() => (to) => {
      const path = route.path
      return path.includes(to)
    })

    return {
      active,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
