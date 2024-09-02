<template>
  <q-btn round flat>
    <svg-icon icon="language" class="cursor-pointer" size="26" />
    <q-menu
      transition-show="scale"
      transition-hide="scale"
    >
      <q-list style="min-width: 100px;">
        <q-item
          v-for="{ locale, name } in lanList"
          :key="locale"
          v-close-popup
          :active="isActive(locale)"
          clickable
          @click="setLanguage(locale)"
        >
          <q-item-section>{{ name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import VxeUI from 'vxe-pc-ui'
import { useApp } from '@/stores/app'
import { useLanguageSetting } from '@/stores/languageSetting'

export default defineComponent({
  setup () {
    const { locale } = useI18n()
    const store = useApp()
    const storeLanguageSetting = useLanguageSetting()

    // data
    const lanList = reactive(storeLanguageSetting.languageSettingList)

    const setLanguage = (lang) => {
      console.log('🚀 ~ setLanguage ~ lang', lang)
      locale.value = lang
      store.setLanguage(lang)
      VxeUI.setLanguage(lang)
    }

    // methods
    const isActive = (lang) => {
      return lang === locale.value
    }

    return {
      lanList,
      isActive,
      setLanguage,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
