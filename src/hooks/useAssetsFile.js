
export default function useAssetsFile () {
  const getImageFile = (url) => {
    const path = `/src/assets/images/${url}`
    const modules = import.meta.glob('@/assets/images/**/*.{png,svg,jpg,jpeg}', { eager: true })
    return modules[path].default
  }

  return {
    getImageFile,
  }
}
