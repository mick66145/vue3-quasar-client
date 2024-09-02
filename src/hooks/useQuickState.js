import { reactive } from 'vue-demi'
import cloneDeep from 'lodash/cloneDeep'

export default function useQuickState (params = {}) {
  const state = reactive({ ...params })
  const backupState = cloneDeep(state)
  const reset = () => {
    Object.assign(state, cloneBackup())
  }
  const clone = () => cloneDeep(state)
  const cloneBackup = () => cloneDeep(backupState)
  return {
    state,
    backupState,
    clone,
    reset,
    assign: (newParams) => Object.assign(state, newParams),
    cloneBackup,
  }
}
