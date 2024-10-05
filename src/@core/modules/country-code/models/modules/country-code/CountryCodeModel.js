
const CountryCode = () => ({
  country_code: null,
  country_name: null,
  country_phone_code: null,
  country_icon: null,
})

export const CountryCodeModel = (item = null) => {
  const model = (item) => {
    return {
      country_code: item?.country_code || null,
      country_name: item?.country_name || null,
      country_phone_code: item?.country_phone_code || null,
      country_icon: item?.country_icon || null,
    }
  }

  return model(item || CountryCode())
}

export default CountryCodeModel
