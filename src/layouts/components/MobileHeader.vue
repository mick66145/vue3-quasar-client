<template>
  <q-header class="flex-center row text-blue-grey-7 fixed-top">
    <q-toolbar class="bg-primary flex-center text-white max-w-768px row shadow-7">
      <q-avatar class="left-3 absolute">
        <base-image
          width="30px"
          heigth="30px"
          src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
        />
      </q-avatar>
      <q-btn flat no-caps no-wrap to="/">
        <q-toolbar-title shrink> {{ $t('g.system.system-name') }}</q-toolbar-title>
      </q-btn>
      <base-icon-button
        class="right-3 absolute "
        icon="menu"
        color="white"
        @click="onToggle"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useApp } from '@/stores/app'
export default defineComponent({
  components: {
  },
  setup () {
    // data
    const storeApp = useApp()

    // methods
    const onToggle = () => {
      storeApp.toggleSideBar()
    }

    return {
      onToggle,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-header {
  @apply top-0 right-0 left-0 fixed ;
  @apply bg-white bg-opacity-0;
}

</style>
