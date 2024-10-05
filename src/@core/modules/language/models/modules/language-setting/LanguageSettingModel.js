
const LanguageSetting = {
  id: null,
  name: null,
  locale: 'zh-TW',
  is_enable: true,
  sequence: 0,
}

export const LanguageSettingModel = (item = null) => {
  const model = (item) => {
    const languageSettingObj = {
      id: item?.id || null,
      name: item?.name || null,
      locale: item?.locale || 'zh-TW',
      is_enable: item?.is_enable || true,
      sequence: item?.sequence || 0,
    }
    return languageSettingObj
  }

  return model(item || LanguageSetting)
}
