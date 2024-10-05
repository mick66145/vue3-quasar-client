
const Area = () => ({
  id: null,
  name: null,
  detail: '',
})

export const AreaModel = (item = null) => {
  const model = (item) => {
    return {
      id: item?.id || null,
      name: item?.name || null,
      detail: item?.detail || '',
    }
  }

  return model(item || Area())
}
