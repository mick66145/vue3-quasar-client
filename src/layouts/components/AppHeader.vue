<template>
  <q-header elevated class="bg-white text-blue-grey-7">
    <q-toolbar>
      <base-flat-button no-wrap class="q-ml-xs" to="/">
        <q-toolbar-title shrink>
          <span class="lt-sm:text-base">{{ $t('g.system.system-name') }}</span>
        </q-toolbar-title>
      </base-flat-button>
      <q-space />
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  components: {
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
