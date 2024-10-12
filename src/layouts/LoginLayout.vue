<template>
  <q-layout view="lHh Lpr lFf" class="bg-white" style="height: 100vh;min-height: 640px;">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
