
const City = () => ({
  id: null,
  name: null,
})

export const CityModel = (item = null) => {
  const model = (item) => {
    return {
      id: item?.id || null,
      name: item?.name || null,
    }
  }

  return model(item || City())
}

export default CityModel
