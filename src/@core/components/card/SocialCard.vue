<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <q-item :style="`background-color: ${bgColor}`" class="q-pa-none">
        <q-item-section
          v-if="iconPosition === 'left'"
          side
          :style="`background-color: ${iconBgColor}`"
          class="text-white q-pa-lg q-mr-none"
        >
          <q-icon :name="icon" color="white" size="24px" />
        </q-item-section>

        <q-item-section class="q-pa-md q-ml-none">
          <q-item-label class="text-white">{{ title }}</q-item-label>
          <q-item-label class="text-white text-weight-bolder text-h6">{{ value }}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="iconPosition === 'right'"
          side
          class="text-white q-mr-md"
        >
          <q-icon :name="icon" color="white" size="44px" />
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    title: { type: String },
    value: { type: [String, Number] },
    icon: { type: String },
    iconPosition: { type: String, default: 'left' },
    iconBgColor: { type: String },
    bgColor: { type: String },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
