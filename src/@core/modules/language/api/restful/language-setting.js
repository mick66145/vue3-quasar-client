import useResource from '@/hooks/useResource'
import { LanguageSettingViewModel } from '@core/modules/language/models'

export const LanguageSettingResource = ({
  uri = 'language_setting',
}) => {
  const { list, get, post, patch } = useResource({ uri, listModel: LanguageSettingViewModel, getModel: LanguageSettingViewModel })

  return {
    list,
    get,
    post,
    patch,
  }
}
