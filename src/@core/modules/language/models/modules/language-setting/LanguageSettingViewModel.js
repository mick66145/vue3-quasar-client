import Base from '@core/models/modules/Base'
import { LanguageSettingModel } from './LanguageSettingModel'

const LanguageSetting = () => ({
  ...Base(),
})

export const LanguageSettingViewModel = (item) => {
  const viewModel = (item) => {
    const languageSettingObj = {
      ...LanguageSettingModel(item),
      ...LanguageSetting(),
    }
    return languageSettingObj
  }

  return viewModel(item)
}
