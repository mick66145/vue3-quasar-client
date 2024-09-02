<template>
  <q-dialog v-model="show" :persistent="persistent">
    <q-card>
      <card-body>
        <q-card-section class="row items-center dialog-header">
          <div class="text-center w-full text-h5">{{ title }}</div>
          <q-space />
        </q-card-section>

        <q-card-section class="text-center text-base w-full scroll q-dialog-body">
          {{ message }}
        </q-card-section>

        <q-card-actions class="q-dialog-footer" align="center">
          <div class="w-full">
            <confirm-button
              size="lg"
              class="w-full q-mb-md"
              :color="confirmButtonColor"
              :label="confirmButtonText"
              @click="onConfirm"
            />
            <cancel-button
              v-if="showCancel"
              size="lg"
              class="w-full"
              :color="cancelButtonColor"
              :label="cancelButtonText"
              @click="onCancel"
            />
          </div>
        </q-card-actions>
      </card-body>
    </q-card>
  </q-dialog>
</template>

<script>
import { useMessageDialogStore } from '@/stores/messageDialog'
import { defineComponent, toRefs } from 'vue-demi'
export default defineComponent({
  setup () {
    const store = useMessageDialogStore()
    // data
    const {
      show,
      title,
      message,
      persistent,
      confirmButtonText,
      confirmButtonColor,
      cancelButtonText,
      cancelButtonColor,
      showCancel,
    } = toRefs(store)

    // methods
    const onConfirm = () => {
      store.confirm()
    }

    const onCancel = () => {
      store.close()
    }

    return {
      store,
      show,
      title,
      message,
      persistent,
      cancelButtonText,
      cancelButtonColor,
      confirmButtonText,
      confirmButtonColor,
      showCancel,
      onConfirm,
      onCancel,
    }
  },
})

</script>

<style lang="postcss" scoped>
.q-card {
  .q-dialog-body {
    @apply min-w-[20rem];
  }
}
</style>
