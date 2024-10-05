import Base from '@core/models/modules/Base'
import { MeModel } from './MeModel'

const Me = () => ({
  ...Base(),
})

export const MeViewModel = (item) => {
  const viewModel = (item) => {
    const meObj = {
      ...MeModel(item),
      ...Me(),
    }
    return meObj
  }

  return viewModel(item)
}
