import Base from '@core/models/modules/Base'

const BaseAddress = {
  ...Base(),
  city: '',
  area: '',
  post_code: '',
  address: '',
}

const BaseAddressModel = (item = null) => {
  const model = (item) => {
    return {
      city: item?.city || '',
      area: item?.area || '',
      post_code: item?.post_code || '',
      address: item?.address || '',
    }
  }
  return model(item || BaseAddress)
}

export default BaseAddressModel
