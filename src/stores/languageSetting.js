import { defineStore } from 'pinia'
import { LanguageSettingResource } from '@core/modules/language/api'

export const useLanguageSetting = defineStore({
  id: 'languageSetting',
  state: () => ({
    languageSettingResource: LanguageSettingResource({}),
    languageSettingList: [],
  }),
  actions: {
    getLanguageSetting () {
      /* 如果有語言設定的api就使用以下註解 */
      return new Promise((resolve, reject) => {
        const query = { orderby: 'sequence:asc,id:desc' }
        this.languageSettingResource.list({ query })
          .then(res => {
            const { list } = res
            this.languageSettingList = list
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
      // return new Promise((resolve) => {
      //   resolve(true)
      // })
    },
  },

})
