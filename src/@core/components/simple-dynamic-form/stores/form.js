import { defineStore } from 'pinia'

export const useFormStore = (formId = 'form') => {
  const store = defineStore({
    id: formId,
    state: () => ({
      formDisabled: false,
      formReadonly: false,
      originalModel: [],
      models: new Map(),
      dataKeyMap: new Map(),
      mainFormData: {},
      compRelationship: new Map(),
    }),
    actions: {
      init (options) {
        this.updateModels(options)
      },
      getModelIdByDataKey (dataKey) {
        return this.dataKeyMap.get(dataKey) || dataKey
      },
      getModel (id) {
        return this.models.get(this.dataKeyMap.get(id) || id)
      },
      getParent (id) {
        return this.getModel(this.compRelationship[this.getModelIdByDataKey(id)]?.layout.parent)
      },
      getFormData () {
        return { ...this.mainFormData }
      },
      getFieldValue (dataKey) {
        return this.mainFormData[dataKey]
      },
      convertModel () {
        const modelsArray = []
        this.models.forEach((item) => {
          modelsArray.push({
            ...item,
            value: this.getFieldValue(item.data_key),
          })
        })
        return modelsArray
      },
      getFormModels () {
        return this.convertModel()
      },
      updateData (data) {
        if (data) {
          for (const [key, value] of Object.entries(data)) {
            this.updateFieldValue(key, value)
          }
        }
      },
      updateModels ({ models }) {
        this.clear()
        // this.originalModel = deepCopy(this.models);

        models.forEach((item) => {
          const parentComps = this.compRelationship[item.layout.parent]
          if (parentComps) {
            parentComps.push(item.id)
          } else {
            this.compRelationship[item.layout.parent] = [item.id]
          }

          this.models.set(item.id, { ...item })

          if (item.data_key) {
            Object.assign(this.mainFormData, { [item.data_key]: item.value })
            this.dataKeyMap.set(item.data_key, item.id)
          }
        })
      },
      updateFieldValue (dataKey, value) {
        Object.assign(this.mainFormData, { [dataKey]: value })
      },
      getChildren (parentId) {
        const children = this.compRelationship[parentId]
        if (children) return children.map((id) => this.getModel(id))
        return []
      },
      setFormDisabled (value) {
        this.formDisabled = value
      },
      setFormReadonly (value) {
        this.formReadonly = value
      },
      reset () {
        this.originalModel.forEach((item) => {
          if (item.data_key) {
            this.updateFieldValue(item.data_key, item.value)
          }
        })
      },
      clear () {
        this.models.clear()
        this.dataKeyMap.clear()
        this.compRelationship.clear()
        this.originalModel = []
        this.formDisabled = false
        this.formReadonly = false
      },
    },
  })
  return store()
}
