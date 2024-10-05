import Base from '@core/models/modules/Base'
import { CityModel } from './CityModel'

const City = () => ({
  ...Base(),
})

export const CityViewModel = (item) => {
  const viewModel = (item) => {
    const cityObj = {
      ...CityModel(item),
      ...City(),
    }
    return cityObj
  }

  return viewModel(item)
}
