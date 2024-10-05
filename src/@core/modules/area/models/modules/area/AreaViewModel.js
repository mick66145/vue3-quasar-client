import Base from '@core/models/modules/Base'
import { AreaModel } from './AreaModel'

const Area = () => ({
  ...Base(),
})

export const AreaViewModel = (item) => {
  const viewModel = (item) => {
    const areaObj = {
      ...AreaModel(item),
      ...Area(),
    }
    return areaObj
  }

  return viewModel(item)
}
