export const registerPlugins = (app) => {
  const imports = import.meta.glob(['@/plugins/*.{ts,js}', '@/plugins/*/index.{ts,js}'], { eager: true })
  const importPaths = Object.keys(imports).sort()

  importPaths.forEach(path => {
    const pluginImportModule = imports[path]
    pluginImportModule.default?.(app)
  })
}
