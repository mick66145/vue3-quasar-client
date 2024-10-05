<template>
  <base-tabs v-for="{ locale, name } in lanList" :key="locale" v-model="observeValue">
    <q-tab :name="locale" :label="name" />
  </base-tabs>
</template>

<script>
import { defineComponent, computed } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { useLanguageSetting } from '@/stores/languageSetting'

export default defineComponent({
  props: {
    modelValue: { type: String },
  },
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const storeLanguageSetting = useLanguageSetting()

    // computed
    const lanList = computed(() => {
      return storeLanguageSetting.languageSettingList
    })

    return {
      observeValue,
      lanList,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
