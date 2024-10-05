
const Me = () => ({
  id: null,
  account: null,
  email: null,
  phone: null,
  passport: null,
  serial_number: null,
  name: null,
  sex: null,
  birthday: null,
  company_name: null,
  uniform_numbers: null,
  job: null,
  tel: null,
  city: '',
  area: '',
  address: null,
  post_code: null,
  image: '',
  provider: [],
})

export const MeModel = (item = null) => {
  const model = (item) => {
    const meObj = {
      id: item?.id || null,
      account: item?.account || null,
      email: item?.email || null,
      phone: item?.phone || null,
      passport: item?.passport || null,
      serial_number: item?.serial_number || null,
      name: item?.name || null,
      sex: item?.sex || null,
      birthday: item?.birthday || null,
      company_name: item?.company_name || null,
      uniform_numbers: item?.uniform_numbers || null,
      job: item?.job || null,
      tel: item?.tel || null,
      city: item?.city || '',
      area: item?.area || '',
      address: item?.address || null,
      post_code: item?.post_code || null,
      image: item?.image || '',
      provider: item?.provider || [],
    }
    return meObj
  }

  return model(item || Me())
}
