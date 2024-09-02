export const registerDirective = (app) => {
  const imports = import.meta.glob(['@/directive/*.{ts,js}', '@/directive/*/index.{ts,js}'], { eager: true })
  const importPaths = Object.keys(imports).sort()

  importPaths.forEach(path => {
    const directiveImportModule = imports[path]
    directiveImportModule.default?.(app)
  })
}
