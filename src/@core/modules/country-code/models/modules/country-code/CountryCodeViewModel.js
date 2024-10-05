import Base from '@core/models/modules/Base'
import { CountryCodeModel } from './CountryCodeModel'

const CountryCode = () => ({
  ...Base(),
  // map欄位
  name_text: '',
})

export const CountryCodeViewModel = (item) => {
  const viewModel = (item) => {
    const countryCodeObj = {
      ...CountryCodeModel(item),
      ...CountryCode(),
      name_text: `${item?.country_phone_code}(${item?.country_name})`,
    }
    return countryCodeObj
  }

  return viewModel(item)
}
